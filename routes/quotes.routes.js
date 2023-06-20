const express = require('express');

const quoteRouter = express.Router();

quoteRouter.get('/quotes', (req, res) => {
  if (req.query.success) {
    return res.send('Citations importées avec succès !');
  }

  return res.render('quotes');
});

quoteRouter.post('/quotes', uploadQuotes.single('file'), (req, res) => {
  return res.redirect('/quotes?success=true');
});
