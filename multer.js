const multer = require('multer');

const userStorage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, 'users.csv');
  },
});

const uploadUsers = multer({ storage: userStorage });

const quoteStorage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, 'quotes.csv');
  },
});

const uploadQuotes = multer({ storage: quoteStorage });

module.exports = {
  uploadUsers,
  uploadQuotes,
};
