// server.js
// where your node app starts

const routes = require('./routes/index.json');

// init project
var express = require('express');
var app = express();
app.set('views', './views')
app.set('view engine', 'ejs')

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('dist'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.render('index', {routes: routes.routes});
});


let port = process.env.PORT || 8000;

// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});