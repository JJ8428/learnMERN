const http = require('http')
const {readFileSync} = require('fs')

// Get the HTML file
const homePage = readFileSync('./content/index.html')
const styleSheet = readFileSync('./content/styles.css')
// This is a blocking read, but we are reading the content before the server is hosted
// The server will only give this variable, it will not load it upon every request

const server = http.createServer((req, res) => {
    console.log(req.url)
    console.log('Server detected a request')
    if (req.url == '/') {
        res.writeHead(200, {'content-type': 'text/html'})
        // Remember, the header tells the broswer what type of info will be sent
        res.write(homePage)
        res.end() // Browser is confused when to stop loading without this line
    }
    else if (req.url == '/styles.css') {
        res.writeHead(200, {'content-type': 'text/css'}) // New tag for CSS file
        res.write(styleSheet)
        res.end()
    }
    else if (req.url == '/about') {
        res.writeHead(200, {'content-type': 'text/html'})
        res.write('<h1>About Page</h1>')
        res.end()
    }
    else {
        res.writeHead(404, {'content-type': 'text/html'})
        res.write('Error 404: <h1>Page not found</h1>')
        res.end()
    }
})

server.listen(5000) // Ports 0 - 1024 are already in use

