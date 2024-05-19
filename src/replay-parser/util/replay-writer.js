import parseReplay from 'fortnite-replay-parser';
import net_field_exports from '../net-field-exports/index.js';
import handle_event_emitter from '../exports/handle-event-emitter.js';
import * as fs from 'node:fs/promises';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const config = {
  handle_event_emitter,
  customNetFieldExports: net_field_exports,
  onlyUseCustomNetFieldExports: true,
  parseEvents: true
};

const replay_writer = async (file_data) => {
  console.log("starting replay writer job");

  try {
    const parsed_replay = await parseReplay(file_data, config);

    const game_id = parsed_replay.header.Guid;

    const game_date = parsed_replay.info.Timestamp;

    const players = parsed_replay.gameData.players;

    const number_of_real_players = players.filter(p => !p.bIsABot && p.Place !== undefined).length;

    const replay_log_msg = [
      "We have successfully parsed the replay file",
      `GameId => ${game_id}`,
      `RealPlayerCount => ${number_of_real_players}`
    ];

    console.log(replay_log_msg.join('\n'));

    const existing_replay = await prisma.game.findUnique({
      where: {
        id: game_id
      }
    });

    if (existing_replay != null) {
      console.log("This replay is already saved: exiting");

      return;
    }

    const user = await prisma.user.findFirst();

    const user_game_stats = players.filter(p => p.UniqueID == user.id).pop();

    if (user_game_stats.Place === undefined) {
      console.log("This game was abandoned in the lobby: exiting");

      return;
    }

    await prisma.game.create({
      data: {
        id: game_id,
        num_real_players: number_of_real_players,
        place: user_game_stats.Place,
        num_kills: user_game_stats.KillScore ?? 0,
        num_real_player_kills: await get_number_of_real_player_kills(parsed_replay.events, players, user.id),
        created_on: game_date
      }
    });

    await fs.writeFile(`./parsed-replays/${game_id}`, JSON.stringify(parsed_replay));

    return true;
  } catch (error) {
    console.log("Could not parse replay file: exiting");
  }
}

const get_number_of_real_player_kills = async (events, players, user_id) => {
  const real_player_ids = players.filter(
    p => !p.bIsABot && p.UniqueID !== user_id).map(p => p.UniqueID
    );

  const player_eliminations = events.filter(
    e => e.group === 'playerElim' && e.eliminator === user_id && e.eliminated !== user_id
  );

  console.log(`Eliminated ${player_eliminations.length} players`);

  const real_players = player_eliminations.filter(
    e => real_player_ids.indexOf(e.eliminated) !== -1
  );

  return real_players.length;
}

export default replay_writer;
