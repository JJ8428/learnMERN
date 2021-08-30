const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/authRoutes')
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// Tell Node where the static files are
app.use(express.static('public'));

// Tell Express that jsons are to be involved
app.use(express.json());

// Tell Node to use ejs as render/view engine
app.set('view engine', 'ejs');

// Tell Node to use the cookie parser middleware
app.use(cookieParser());

// Set up the DB connection
const db_URI = 'mongodb+srv://nsatti:<password>@cluster0.d5zo7.mongodb.net/node_word?retryWrites=true&w=majority';
mongoose.connect(db_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then((result) => {
        app.listen(5050);
        console.log('Listening on Port 5050');
    })
    .catch((err) => console.log('Unable to connect to DB, the error in question: ', err));

app.get('*', checkUser);

app.get('/', (req, res) => res.render('home'));
app.get('/words', requireAuth, (req, res) => res.render('words'));

app.get('/get-cookies', (req, res) => {
    // Cookes can only hold one variable
    
    // Giving a new cookie to a user who already has a cookie
    // simply updates the cookie with new parameters

    // Write a cookie(s)
    res.cookie('GRE Words Cookie', true);
    res.cookie('testing', true, {httpOnly: true});
    
    res.send('Check the cookies in the browser console.');
});

app.get('/read-cookies', (req, res) => {
    // Read a cookie
    res.json(req.cookies);
    
    // You can access these cookies info like simple jsons
});

// Coding all the get and post methods here is not good practice, so lets do that in a routes
app.use('/', router);
