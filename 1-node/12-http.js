const http = require('http');

// Node.js should not be set up like this at all, but this is simply for demo purposes of http
const server = http.createServer((req, res) => {
    if (req.url == '/') {
        res.end('This is the home page') // res.end can be seen as a return statement
    }
    else if (req.url == '/about') {
        res.end('This is the about page')
    }
    res.end(
        '<h1>Oops</h1>' +
        'We can\'t find this page.<br><br>' +
        '<a href="/">Back</a>'
    )
})

// Tell what port to listen to, so the site is localhost/5000/*
server.listen(5000);