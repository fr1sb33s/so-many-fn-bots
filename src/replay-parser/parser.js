import replay_writer from './util/replay-writer.js';
import * as fs from 'node:fs/promises';

const job_queue = [];

const queue_jobs = async () => {
  if (job_queue.length > 0) {
    console.log(`Still processing ${job_queue.length} jobs from a previous run`);

    return;
  }

  const files = await fs.readdir('./replays');

  files.forEach(async (file) => {
    if (file.indexOf('.replay') != -1) {
      console.log(file);
      job_queue.push(async () => {
        const file_data = await fs.readFile(`./replays/${file}`);

        await replay_writer(file_data);
      });
    }
  });

  while (job_queue.length > 0) {
    const job = job_queue.pop();

    await job();
  }
};

export default queue_jobs;
