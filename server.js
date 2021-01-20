const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;
const usersController = require('./controllers/usersController');


////////////////////////////////////////////////////////
// Configuration / Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


/////////////////////////////////////////////////////////
// Controller
app.use('/users', usersController);


/////////////////////////////////////////////////////////
// ROUTES
app.get('/items', (req, res) => {
  res.render('items/browseItems');
})


app.get('/', (req, res) => {
  res.render('home');
});


/////////////////////////////////////////////////////////
// START THE SERVER
app.listen(PORT, () => {
  console.log(`Your app is listening on PORT: ${PORT}`);
});
