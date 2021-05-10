const express = require('express');
const session = require('express-session');
const app = express();
const PORT = 4000;
const usersController = require('./controllers/usersController');


////////////////////////////////////////////////////////
// Configuration / Middleware
app.set('view engine', 'ejs');

// Parse the request body
app.use(express.urlencoded({extended: true}));

// Attach a session object to every request that enters the server
app.use(session({
  secret: 'milo the barking dog',
  resave: false, // Only store user one time when user logs in
  saveUninitialized: false, // Only store cookies for users that are logged in
  cookie: {
    // secure: true // Only use with HTTPS, for demo we are using HTTP
    maxAge: 1000 * 60 * 60 * 24 * 2 // Cookie is valid for 2 days
  }
}));

/////////////////////////////////////////////////////////
// Controller
app.use('/users', usersController);


/////////////////////////////////////////////////////////
// ROUTES
app.get('/items', (req, res) => {
  // If user is not logged in
  // redirect to home page
  if (!req.session.currentUser) {
    return res.redirect('/');
  }

  console.log(req.session);

  res.render('items/browseItems');
})


app.get('/', (req, res) => {
  // console.log(req.session);
  if (req.session.currentUser) {
    return res.redirect('/users/account-page');
  }

  res.render('home');
});


/////////////////////////////////////////////////////////
// START THE SERVER
app.listen(PORT, () => {
  console.log(`Your app is listening on PORT: ${PORT}`);
});
