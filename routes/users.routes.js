const express = require('express');

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  if (req.query.success) {
    return res.send('Utilisateurs importés avec succès !');
  }

  return res.render('users');
});

userRouter.post('/', uploadUsers.single('file'), (req, res) => {
  return res.redirect('/users?success=true');
});
