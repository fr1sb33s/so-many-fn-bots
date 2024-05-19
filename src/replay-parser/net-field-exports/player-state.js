import replayParser from 'fortnite-replay-parser';

/**
 * @type {replayParser.NetFieldExport}
 */
export default {
  path: [
    '/Script/FortniteGame.FortPlayerStateAthena',
  ],
  parseLevel: 1,
  exportGroup: 'gameData',
  exportName: 'players',
  exportType: 'array',
  properties: {
    UniqueID: {
      name: 'UniqueID',
      parseFunction: 'readNetId',
      parseType: 'default',
    },
    PlayerNamePrivate: {
      name: 'PlayerNamePrivate',
      parseFunction: 'readString',
      parseType: 'default',
    },
    bIsABot: {
      name: 'bIsABot',
      parseFunction: 'readBit',
      parseType: 'default',
    },
    KillScore: {
      name: 'KillScore',
      parseFunction: 'readInt32',
      parseType: 'default',
    },
    Place: {
      name: 'Place',
      parseFunction: 'readInt32',
      parseType: 'default',
    }
  }
};