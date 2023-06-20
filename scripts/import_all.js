const { PrismaClient } = require('@prisma/client');
const processQuote = require('../utils/process_quote');
const processUser = require('../utils/process_user');

const prisma = new PrismaClient();

async function main() {
  processUser(prisma);
  processQuote(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
