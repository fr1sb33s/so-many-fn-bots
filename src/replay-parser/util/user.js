import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const set_user = async (user_id) => {
  const user = await get_user();

  if (user) {

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        id: user_id
      }
    });

    return;
  }

  await prisma.user.create({
    data: {
      id: user_id
    }
  })
}

export const get_user = async () => {
  const user = await prisma.user.findFirst();

  return user;
} 
