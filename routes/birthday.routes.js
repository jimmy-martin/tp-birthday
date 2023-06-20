const express = require('express');

const birthdayRouter = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

birthdayRouter.get('/', async (req, res) => {
  try {
    const today = new Date();

    const allUsers = await prisma.user.findMany();

    const users = allUsers.filter((user) => {
      const birthday = new Date(user.birthdate);
      return birthday.getDate() === today.getDate() && birthday.getMonth() === today.getMonth();
    });

    return res.status(200).json(users);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = birthdayRouter;
