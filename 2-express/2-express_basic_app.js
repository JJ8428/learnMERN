const express = require('express')
const path = require('path')
const { products } = require('./data')

const app = express()

app.use(express.static('./content'))
// We are telling express all files in this folder are static 
// and that there is not a single dynamic file (Good practice)

// We can comment this out since '/' in express automatically defaults to...
// GET
// '/' as the url
// Looks for a index.html in the static folder (if given)
/*
app.get('/', (req, res) => {
    // res.status(200) // Express.js takes care of status
    res.sendFile(path.join(__dirname, './content/index.html'))
})
*/

app.get('/random_json', (req, res) => {
    res.status(200).json({
        'Name': 'JJ',
        'Age': '20',
        'Sad': true,
    })
})

app.get('/api/products/first', (req, res) => {
    res.json(products[0])
    // const first_product = products.find((products) => products.id == 1)
    // res.json(first_product)
})

app.get('/api/products/:productID', (req, res) => { // this is how to get arguments from the link
    // args from the link are always read as a string, so typecast as necessary
    // res.json(req.params) // {"productID":"2"}
    const this_prod_id = Number(req.params.productID)
    if (this_prod_id < 0 || this_prod_id > products.length) {
        res.status(404).send('Product does not exist.')
    }
    else {
        res.json(products[this_prod_id])
    }
    // const first_product = products.find((products) => products.id == 1)
    // res.json(first_product)
})

app.get('/api/v1/query', (req, res) => { // Lets the link have as many args as the user defines
    console.log(req.query)
    const { search, limit } = req.query // Look for a search arg and a limit arg, if not, it will be null
    let sorted = [...products]
    if (search) { // If a search arg was provided and not null
        sorted = sorted.filter((product) => {
            return product.name.startsWith(search)
        })
    }
    if (limit) { // If a limit arg was provided and not null
        sorted = sorted.slice(0, Number(limit))
    }
    // You cannot send multiple responses
    if (sorted.length == 0) {
        res.send('No Product Found')
    }
    else {
        res.json(sorted) // If you don't have if/else if end the function, use the if
    }
    // Example of a valid link to query: http://localhost:5000/api/v1/query?search=a&limit=1    
})

app.get('/about', (req, res) => {
    res.status(200).send('About Page')
})

app.all('*', (req, res) => {
    res.status(404)
    res.send('Resource does not exist.')
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000')
})

