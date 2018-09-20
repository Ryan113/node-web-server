const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

// partials are for pieces of html that you will always use
hbs.registerPartials(__dirname + '/views/partials');
// use hbs to create views
app.set('view engine', 'hbs');
// link to static pages
app.use(express.static(__dirname + '/public'));
//register middlewear
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = now + ': ' + req.method + ': ' + req.url;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (request, response) => {
  response.render('home.hbs', {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to this amazing website!",
  })
});

// app.get('/maintenance', (request, response) => {
//   response.render('maintenance.hbs', {
//     pageTitle: "Maintenance Page",
//     welcomeMessage: "Page is underconstruction",
//   })
// });

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'Shit is broke yo',
    options: [
      'cry',
      'run'
    ]
  });
});

app.listen(port, () => {
  console.log('Server is up on port: ' + port);
});
