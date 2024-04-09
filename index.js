const fs = require('fs');
const parseReplay = require('fortnite-replay-parser');
const replayBuffer = fs.readFileSync('UnsavedReplay-2024.04.06-20.21.58.replay');

const config = {
    parseLevel: 10,
    debug: false,
}

parseReplay(replayBuffer, config).then((parsedReplay) => {
    const player_data = parsedReplay.gameData.players;

    const number_of_real_players = player_data.filter(p => !p.bIsABot).length;

    console.log(`There were ${number_of_real_players} real players in this game`);

    fs.writeFileSync('parsed-replay-2024.04.06-20.21.58.json', JSON.stringify(player_data));
}).catch((err) => {
    console.error('An error occured while parsing the replay!', err);
});
