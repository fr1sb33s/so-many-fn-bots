import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const get_latest_replays = async () => {
  const recent_replays = await prisma.game.findMany({
    orderBy: {
      created_on: 'desc',
    },
    take: 20,
  });

  return recent_replays;
};

export default get_latest_replays;
