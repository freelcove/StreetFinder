import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === 'production') {
  global.prisma = new PrismaClient();
} else {
  // Ensure that we use the same prisma instance in development
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
}

export default global.prisma;
