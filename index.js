const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;

const allowedOrigins = ['http://localhost:3000', process.env.FRONTEND_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'Accès refusé !';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  return res.render('index');
});

app.use('/users', require('./routes/users.routes'));
app.use('/quotes', require('./routes/quotes.routes'));

app.use('/api/birthdays', require('./routes/birthday.routes'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
