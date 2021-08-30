var http = require('http')
var fs = require('fs')

http.createServer(function (req, res) {
    const fileStream = fs.createReadStream('./content/big.txt', 'utf8')
    fileStream.on('open', () => {
        fileStream.pip(res) // Instead of laoding the site after the entire file is read...'
        // The site now loads as chunks of the file are sent
        // Inspect shows a much faster loading time
    })
    fileStream.on('error', (err) => {
        res.end(err)
    })
}).listen(5000)