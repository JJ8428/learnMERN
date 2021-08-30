const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Function to retrieve those custom errors
// TBH, I don't understand this too well, this was done by parsing the json manually
const errHandler = (err) => {
    console.log(err.message, err.code);
    // err.code is most of the time undefined
    this_err = {
        "email_err": [],
        "password_err": [],
    }
    if (err.code == 11001) { // Error code specifically for email taken
        this_err.email_err = 'This email is already taken.';
        return this_err;
    }

    if (err.message == 'Incorrect Password') {
        this_err.email_err = err.message;
        return this_err;
    }

    if (err.message == 'Incorrect Email') {
        this_err.email_err = err.message;
        return this_err;
    }

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            console.log(properties);
            if (properties.path == 'email') {
                this_err.email_err.push(properties.message);
            }
            else {
                this_err.password_err.push(properties.message);
            }
        });
    }
    
    return this_err;
};

maxAge = 60* 60 * 24 * 1 // This is seconds, so ...
const createToken = (id) => {
    return jwt.sign(
        {id},
        'JJ Secret', // In production, make sure you never reveal this
        // The string above will be used to maintain cookies that users can keep to be logged in,
        // for a certain amount of time even after closing the browser
        {expiresIn: maxAge}, // Cookie expires in a day
    );
};

// Node automatically looks for a 'views' folder

signup_get = (req, res) => {
    res.render('signup');
};

login_get = (req, res) => {
    res.render('login');
};

signup_post = async (req, res) => {
    // Look for a email and password variable in the req.body
    const { email, password } = req.body;
    console.log(req.body);
    try {
        // This is an async task btw, so we need to make the obj first, then we can continue
        const user = await User.create({email, password});
        // Just so you know, the user object has characteristic called _id that is default
        const token = createToken(user._id);
        // Make a cookie and give it to the user
        // Cookies let users stay logged in even if browser is closes
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        // httpOnly means users cannot edit the token
        // What {...} does is that when we refer to the data given by this post request,
        // we can have simple if statements that check if a user or error characteristic exists
        res.status(201).json({user});
    } catch (err) {
        // console.log(err);
        const error = errHandler(err);
        // res.status(400).send('Error, unable to create user');
        res.status(400).json({error});
    }
};

login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        console.log('Logging in user of id: ', user._id);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(200).json({user: user._id})
    } catch (err) {
        const error = errHandler(err);
        res.status(400).json({error});
    }
};

// To log out, we simply need to delete the cookie
// We can't delete cookies sadly, but we can replace it with a null cookie
logout_get = (req, res) => {
    console.log('Wiping cookie to logout user.')
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}

module.exports = { signup_get, login_get, signup_post, login_post, logout_get };