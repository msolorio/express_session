const express = require('express');
const router = express.Router();
const db = require('../models');


///////////////////////////////////////////////////////
// SHOWS THE SIGNUP FORM
router.get('/signup', (req, res) => {
  res.render('users/signup');
});


///////////////////////////////////////////////////////
// HANDLES SUBMIT OF SIGNUP FORM
router.post('/', (req, res) => {
  res.redirect('/users/login');
});


///////////////////////////////////////////////////////
// SHOWS THE LOGIN FORM
router.get('/login', (req, res) => {
  res.render('users/login');
});


///////////////////////////////////////////////////////
// HANDLES SUBMIT OF LOGIN FORM
router.post('/login', (req, res) => {
  res.redirect('/users/login');
});


///////////////////////////////////////////////////////
// HANDLES LOGGING OUT
router.get('/logout', (req, res) => {
  res.redirect('/');
});


///////////////////////////////////////////////////////
// SHOWS USER'S ACCOUNT PAGE
router.get('/:id', (req, res) => {
  db.User.findById(req.params.id, (err, foundUser) => {
    if (err) return console.log(err);

    const context = {
      currentUser: foundUser
    }
  
    res.render('users/accountPage', context);
  });
});

module.exports = router;
