const express = require('express')
const app = express()

const people = require('./routes/people')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('./content'))

const authorize = (req, res, next) => {
    const { user } = req.query
    if (user == 'jj') {
        req.user = {name: 'jj', id: 3}
        next()
    }
    else {
        res.status(401).send('Unauthorized')
    }
}

app.post('/login', authorize, (req, res) => {
    const { name } = req.body
    if (name) {
        return res.status(200).send(`Welcome ${name}`)
    }
    res.status(401).send('Please Provide Credentials')
})

app.use('/api/people', people)

app.listen(5000, () => {
    console.log('Server is listening on port 5000....')
})