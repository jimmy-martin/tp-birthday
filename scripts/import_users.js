const csv = require('csv');
const fs = require('fs');
const path = require('path');

const csvFile = path.join(__dirname, '..', 'uploads', 'users.csv');

const { PrismaClient } = require('@prisma/client');
const processUser = require('../utils/process_user');

const prisma = new PrismaClient();

async function main() {
  processUser(prisma);
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
