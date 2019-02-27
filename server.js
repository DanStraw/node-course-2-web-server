const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log(err);
    }
  })
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    name: 'Daniel',
    pageTitle: 'Welcome',
    welcomeMessage: 'Welcome to my website. Some of my interests are:',
    likes: ['beer', 'coding', 'reading', 'gaming'],
  })
  // res.send({
  //   name: 'Daniel',
  //   likes: ['beer', 'coding', 'reading', 'gaming']
  // });
  // res.send('text');
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About',
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects',
    projects: ['SportsJunkies', 'RipeMetrics', 'Pick-A-Pet', 'DineTime']
  })
})

app.get('/bad', (req, res) => {
  res.send(
    {
      errorMessage: 'bad request',
      errorCode: 404
    }
  );
})
app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}`)
});

