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
  console.log(req.body);

  db.User.create(req.body, (err, createdUser) => {
    if (err) return console.log(err);

    res.redirect('/users/login');
  });

});


///////////////////////////////////////////////////////
// SHOWS THE LOGIN FORM
// /users/login
router.get('/login', (req, res) => {
  console.log('req query parameters ==>', req.query.message);

  res.render('users/login', { message: req.query.message });
});


///////////////////////////////////////////////////////
// HANDLES SUBMIT OF LOGIN FORM
// /users/login
router.post('/login', (req, res) => {
  // Check DB and see if we have user with username from the form
  db.User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) return console.log(err);

    // If no user found with username from the form
    // redirect to login
    if (!foundUser) {
      return res.redirect('/users/login?message="No user found with that username"');
    }

    // If password from the form does not match password from DB
    // redirect to login
    if (req.body.password !== foundUser.password) {
      return res.redirect('/users/login?message="Password incorrect"');
    }

    req.session.currentUser = foundUser;

    res.redirect(`/users/${foundUser._id}`);
  });
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
  
    res.render('users/accountPage', { currentUser: foundUser });
  });
});

module.exports = router;
