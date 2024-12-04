import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  let prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = prismaClientSingleton();

export default prisma;
