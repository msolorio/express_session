const express = require('express');
const app = express();
const PORT = 4000;

app.set('view engine', 'ejs');

/////////////////////////////////////////////////////////
// AUTH ROUTES
/////////////////////////////////////////////////////////
app.get('/signup', (req, res) => {
  res.render('auth/signup');
});


app.post('/signup', (req, res) => {
  // add user to db

  // redirect to accout page
  res.send('User has signed up');
});


app.get('/login', (req, res) => {
  res.render('auth/login');
});


app.post('/login', (req, res) => {
  // get user from db

  // redirect to account page
  res.send('User has logged in');
});

/////////////////////////////////////////////////////////
// USER ROUTES
/////////////////////////////////////////////////////////
app.get('/users/:id', (req, res) => {
  res.render('users/accountPage');
});

app.get('/', (req, res) => {
  res.render('home');
});


app.listen(PORT, () => {
  console.log(`Your app is listening on PORT: ${PORT}`);
});
