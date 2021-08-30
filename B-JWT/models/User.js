const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator'); // Neat little package to validate emails
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    // This is nice, but what if we want custom error messages for each parameter? 
    // Change the characteristics of each variable to be arrays instead of simple booleans as shown below
    /*
    Original without custom error messages
    email: {
        type: String,
        required: true,
        unique: true, // Other users cannot share email
        lowercase: true, // Will turn all letters into lowercase    
    },
    */
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true, // No error message for unique :(
        validate: [isEmail, 'Please enter a VALID email'], // Make sure its email
        lowercase: true // Will turn all letters into lowercase    
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Please enter a password of ATLEAST 6 characters']
    }
});

// Mongohooks are middle ware functions called before (pre) and after (post) the schema is saved to the database
userSchema.post('save', function(doc, next) {
    console.log('User has been created and saved.');
    next();
});

userSchema.pre('save', async function(next) { // We are using a normal function so we can refer to 'this'
    // pre save has no doc because it is not saved yet
    console.log('Attempting to create, hash, and save user.')
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        } throw Error('Incorrect Password');
    } throw Error('Incorrect Email');
};

// Remember, the string tells what collection to refer to without pluralization
// mongoose driver is going to look for a collection in the DB called 'users'
// It pluralizes it automatically
const User = mongoose.model('user', userSchema);

module.exports = User;