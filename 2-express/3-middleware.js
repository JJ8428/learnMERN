const express = require('express')
const authorize = require('./authorize')
const app = express()

const logger = (req, res, next) => {
    console.log(req.method, req.url)
    next() // Ends the middle ware and continues on
    // We can also have a res.send(...) but next lets us access the unique code in each get req coded
}

// Suppose we need to apply the logger function, to every method...
// app.use(logger) // All methods above don't use the logger, all below do
// If you want this to apply to links that say /logger, so for example
// localhost:5000/logger/hey123 or localhost:5000/logger/, then do the following
// app.use('/logger', logger)


app.use('/', [authorize, logger]) // Authorize first, then logger
/*
app.get('/', logger, (req, res) => {
    res.send('Home')
})

app.get('/about', logger, (req, res) => {
    res.send('About')
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000')
})
*/
app.get('/', (req, res) => {
    res.send('Home')
})

app.get('/about', (req, res) => {
    res.send('About')
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000')
})