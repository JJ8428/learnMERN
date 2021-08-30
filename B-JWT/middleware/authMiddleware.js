const jwt = require('jsonwebtoken');
const User = require('../models/User');

// The point of this is to protect certain pages from those not logged in
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    // Check if a jwt exists and is verified
    if (token) {
        jwt.verify(token, 'JJ Secret', (err, decodedToken) => {
            if (err) { // This only occurs if token cannot be verified
                // console.log('Token is NOT verified.');
                res.redirect('/login');
            } else {
                // console.log('Token is verified, decoded token is:', decodedToken);
                next();
            }
        });
        next();
    } else { // If no token exists, redirect to login page
        res.redirect('/login');
    }
};

const checkUser = (req, res, next) => {
    // This methods looks for the token our website creates for users
    // If it exists, it makes the User obj able to accessed by saving a copy of it in res.locals
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'JJ Secret', async (err, decodedToken) => {
            if (err) {
                // console.log('Token is NOT verified.');
                res.locals.user = null;
                next();
            } else {
                // console.log('Token is verified, passing to res.locals...');
                let user = await User.findById(decodedToken.id); // Not a const, since we may add options to modify user data
                console.log('User OBJ put into res.locals');
                res.locals.detected_user = user; // res.locals exists to let us pass variables from middleware to the controllers
                next();
            }
        });
    } else {
        console.log('Token does not exist.');
        res.locals = null;
        next();
    }
}

module.exports = { requireAuth, checkUser };