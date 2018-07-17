const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});

app.set('view engine', 'hbs');
// MiddleWare starts here
app.use((req, res, next)=>{
  var now = new Date().toString();
  console.log(`${now}: ${req.method} ${req.url}`);
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile ('server.log', log + '\n', (err)=>{
    if(err){
      console.log('Unable to appned to server.log');
    }
  });
  next();
});

// app.use((req, res, next)=>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public' ));
// MiddleWare ends here
app.get('/',(req, res)=>{
  // res.send({
  //   'name':'junaid',
  //   'likes':[
  //     'drving',
  //     'node js'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle:'Home Page Data',
    welcomeMessage:'Hello from home page'
  });
});

app.get('/about',(req, res)=>{
  //res.send('About Page');
  res.render('about.hbs', {
    welcomeMessage:'About Page Welcome Message',
    pageTitle:'About Page Data'
  });
});

app.get('/help',(req, res)=>{
  res.send('Help Page');
});

app.get('/bad',(req, res)=>{
  res.send({
    'errorMessage':'Bad request'
  });
});

app.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
});
