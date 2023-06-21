const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const dotenv = require('dotenv');
const sendMails = require('./utils/sendMails');
dotenv.config();

const app = express();
const port = 8080;

const allowedOrigins = ['http://localhost:3000', process.env.FRONTEND_URL];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  return res.render('index');
});

app.use('/users', require('./routes/users.routes'));
app.use('/quotes', require('./routes/quotes.routes'));

app.use('/api/birthdays', require('./routes/birthday.routes'));

cron.schedule('0 8 * * *', async () => {
  console.log('Envoi des mails du jours ...');
  await sendMails();
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
