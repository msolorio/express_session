const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../models');

router.get('/signup', (req, res) => {
  console.log('hit GET for /auth/signup')
  res.render('users/signup');
});


router.post('/', (req, res) => {
  // console.log('req.body =', req.body);

  // Check if username already exists
  db.User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (foundUser) {
      return res.redirect('/users/signup');
    }

    // Hash the user's password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return console.log(err);

      bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
        if (err) return console.log(err);
        
        // Replace user's plain text password with hashed password
        const newUser = {
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword
        };

        // console.log('newUser ==================================');
        // console.log(newUser);

        // Create new user
        db.User.create(newUser, (err, createdUser) => {
          if (err) return console.log(err);

          // Direct to Login page
          res.redirect('/users/login');
        });
      })
    });
  });
});


router.get('/login', (req, res) => {
  res.render('users/login');
});


router.post('/login', (req, res) => {
  // get user from db based on the email from the form
  db.User.findOne({ username: req.body.username }, (err, foundUser) => {
    // if no found user
    if (!foundUser) {
      return res.redirect('/users/login');
    }

    // Compare password passed in to one in DB
    bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
      if (err) return console.log(err);

      // Password was correct
      if (result) {
        console.log('password matched!');
        // attach user to session object
        req.session.currentUser = foundUser;

        // console.log('req.session =================================')
        // console.log(req.session);

        return res.redirect(`/users/${foundUser._id}`);

      // Password was incorrect
      } else {
        return res.redirect('/users/login');
      }
    });

  })

  // redirect to account page
});


router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return console.log(err);

    res.redirect('/');
  })
});


router.get('/:id', (req, res) => {
  // console.log(req.session.currentUser);

  if (!req.session.currentUser) {
    return res.redirect('/users/login');
  }

  const context = {
    currentUser: req.session.currentUser
  }

  res.render('users/accountPage', context);
});

module.exports = router;
