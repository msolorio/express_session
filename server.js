const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const PORT = 4000;

const usersController = require('./controllers/usersController');

// Configuration / Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: process.env.SESSION_SECRET || 'milo the barking dog',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2
  }
}));

// Controller
app.use('/users', usersController);

app.get('/', (req, res) => {
  res.render('home');
});


app.listen(PORT, () => {
  console.log(`Your app is listening on PORT: ${PORT}`);
});
