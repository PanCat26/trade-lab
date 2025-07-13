import { PrismaClient } from '@prisma/client'

const currentGlobal = globalThis
const prisma = currentGlobal.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  currentGlobal.prisma = prisma
}

if (!currentGlobal.prismaCleanup) {
  currentGlobal.prismaCleanup = true;
  
  ['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, async () => {
      try {
        await prisma.$disconnect();
      } catch (error) {
        console.error('Error disconnecting Prisma:', error);
      } finally {
        process.exit(0);
      }
    });
  });
}

export default prisma
