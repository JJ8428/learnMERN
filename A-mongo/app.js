const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

app = express();

/*
Steps to acquire this
    1. Go to MongoDB atlas, and create a cluster
    2. Create a initial user with read and write access 
        Be sure to remember their password!!!
    3. Click on connect, add your IP(s), select Connect with Application, and copy the link
*/
// Make sure to fill it with your passoword where the url has <password>
mongodb_url_orig = 'mongodb+srv://nsatti:<password>@cluster0.d5zo7.mongodb.net/node_blog?retryWrites=true&w=majority';
mongodb_url = 'mongodb+srv://nsatti:Renualt88@cluster0.d5zo7.mongodb.net/node_blog?retryWrites=true&w=majority';
mongoose.connect(mongodb_url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        app.listen(5000);
        console.log('Listening on Port 5000 with DB connected');
    })
    .catch((err) => console.log('Error in connecting to DB: ', err));

app.get('/add-blog', (req, res) => {
    // Creating mongoose model object
    const blog = new Blog({
        title: 'This is title',
        snippet: 'This is snippet',
        body: 'This is body'
    });
    // This will save the mongoose model in the cluster we identified above
    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((error) => {
            console.log(error)
        });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => res.send(result))
        .catch((error) => console.log(error));
});





/*
app.listen(5000, () => {
    console.log('Hosted on Port 5000')
});
*/