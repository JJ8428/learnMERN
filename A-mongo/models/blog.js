const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Schema defines the structure of a model
const blogSchema = new schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamp: true});

// This will look in atlas for a blog or blogs cluster
// Yes, it will auto pluralize
const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;