import replayParser from 'fortnite-replay-parser';
import handle_player_state from './property-exports/handle-player-state.js'

/**
 * @param {replayParser.EventEmittersObject} param0
 */
const handle_event_emitter = ({ p }) => {
  p.on('FortniteGame.FortPlayerStateAthena', handle_player_state);
};

export default handle_event_emitter;