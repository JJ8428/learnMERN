const http = require('http');

const server = https.createServer((req, res) => {
    if (req.url == '/') {
        res.end('Home Page')
    }
    else if (req.url == '/about') {
        // Running this for loop would make /about have a significant loading time due to it BLOCKING
        // Calling for other pages would also have a load time since its trying to serve the about page
        // Always strive to set code aysnc so this issue doesn't persist
        for (var a = 0; a < 1000; a++) {
            for (var b = 0; b < 1000; b++) {
                continue
            }
        }
        res.end('About Page')
    }
    else {
        res.end('Error Page')
    }
})

server.listen(5000, () => {
    console.log('Listening on port 5000')
})