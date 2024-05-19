import termkit from 'terminal-kit';
import get_latest_replays from './src/replay-retreiver/index.js';
import queue_jobs from './src/replay-parser/parser.js';

const term = termkit.terminal;

term.grabInput();

term.on('key', async (name) => {
    if (name === 'r') {
        console.log('reloading results....');

        await draw_results_table();
    }

    if (name === 'CTRL_C') { process.exit(); }
});

const draw_results_table = async () => {
    term.clear();

    await queue_jobs();

    term.clear();

    const replays = (await get_latest_replays()).map(g => Object.values(g));

    const table_data = [["GameId", "# of Real Players", "# of Kills", "# Real Player Kills", "Place", "Date of Game"]].concat(replays);

    term.table(table_data);

    term.bold.cyan('Press r to reload results...\n');

    term.green('Hit CTRL-C to quit.\n\n');
}

await draw_results_table();

