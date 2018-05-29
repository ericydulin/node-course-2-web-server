const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append server log.')
        }
    });
    next();
}); 
//next lets it continue, without next will not fire rest of app after this line

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//can use partials to hold/send functions. This partial can carry a function
//which can go through multiple parts.

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to Home!',
    });
});
    // res.send('<h1>Hello Express</h1>');
    // res.send({
    //     name: 'Eric',
    //     likes: [
    //         'biking',
    //         'crypto',
    //         'raves'
    //     ]
    // })

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        // currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request.'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000')
});


//app.get is a register handler, handles http get requests. Want url so use /, then
//second function needs request and response; request stores information coming in and path
//response has many methods and can respond to requests in multiple ways

//app.listen needed to receive, binds port to machine