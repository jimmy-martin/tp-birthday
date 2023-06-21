const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');

const sendMails = async () => {
  const prisma = new PrismaClient();

  const allUsers = await prisma.user.findMany();

  const users = allUsers.filter((user) => {
    const birthday = new Date(user.birthdate);
    return birthday.getDate() === today.getDate() && birthday.getMonth() === today.getMonth();
  });

  if (users.length === 0) {
    console.log("Aucun anniversaire aujourd'hui");
    return;
  }

  const transporter = nodemailer.createTransport({
    port: 465,
    host: process.env.MAIL_HOST,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  for (const user of users) {
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "Toute l'équipe de MyDigitalSchool Paris te souhaite un joyeux anniversaire !",
      text: `Bonjour ${user.firstname} ${user.lastname}, nous te souhaitons un joyeux anniversaire !`,
      html: `<p>Bonjour ${user.firstname} ${user.lastname}, nous te souhaitons un joyeux anniversaire !</p>`,
    });
  }

  await prisma.$disconnect();
};

module.exports = sendMails;
