const express = require('express');
const router = express.Router();
const db = require('../models');

// CURRENT PATH - /users

///////////////////////////////////////////////////////
// SHOWS THE SIGNUP FORM
// /users/signup
router.get('/signup', (req, res) => {
  res.render('users/signup');
});


///////////////////////////////////////////////////////
// HANDLES SUBMIT OF SIGNUP FORM
// /users
router.post('/', (req, res) => {
  res.redirect('/users/login');
});


///////////////////////////////////////////////////////
// SHOWS THE LOGIN FORM
// /users/login
router.get('/login', (req, res) => {
  res.render('users/login');
});


///////////////////////////////////////////////////////
// HANDLES SUBMIT OF LOGIN FORM
// /users/login
router.post('/login', (req, res) => {
  res.redirect('/users/login');
});


///////////////////////////////////////////////////////
// HANDLES LOGGING OUT
// /users/logout
router.get('/logout', (req, res) => {
  res.redirect('/');
});


///////////////////////////////////////////////////////
// SHOWS USER'S ACCOUNT PAGE
// /users/:id
router.get('/:id', (req, res) => {
  db.User.findById(req.params.id, (err, foundUser) => {
    if (err) return console.log(err);

    const context = {
      currentUser: foundUser
    }
  
    res.render('users/accountPage', { currentUser: foundUser });
  });
});

module.exports = router;
