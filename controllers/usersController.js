const express = require('express');
const bcrypt = require('bcrypt');
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

  // If user already exists with that username
  // redirect to signup form
  db.User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (foundUser) {
      return res.redirect('/users/signup');
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return console.log(err);

      bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
        if (err) return console.log(err);

        const newUser = {
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword
        }
        
        db.User.create(newUser, (err, createdUser) => {
          if (err) return console.log(err);
      
          res.redirect('/users/login');
        });
      });
    })
  })
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
    // if (req.body.password !== foundUser.password) {
    //   return res.redirect('/users/login?message="Password incorrect"');
    // }

    bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
      if (err) return console.log(err);

      // If password was incorrect, redirect to login page
      if (!result) {
        return res.redirect('/users/login');
      }

      req.session.currentUser = foundUser;
  
      // Redirects to the account page
      res.redirect(`/users/account-page`);
    })

  });
});


///////////////////////////////////////////////////////
// HANDLES LOGGING OUT
// /users/logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return console.log(err);

    res.redirect('/');
  });
});


///////////////////////////////////////////////////////
// SHOWS USER'S ACCOUNT PAGE
// /users/account-page
router.get('/account-page', (req, res) => {
  // If there is no user, redirect to home page
  if (!req.session.currentUser) {
    return res.redirect('/');
  }

  db.User.findById(req.session.currentUser._id, (err, foundUser) => {
    if (err) return console.log(err);
  
    res.render('users/accountPage', { currentUser: foundUser });
  });
});

module.exports = router;
