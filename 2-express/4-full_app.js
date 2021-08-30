const express = require('express')
const app = express()
let { people } = require('./data')
const {readFileSync} = require('fs')

const form_1 = readFileSync('./content/form.html')
const form_2 = readFileSync('./content/form_js.html')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('./content'))

// You need this for req.body to be unencoded

/*
app.get('/form', (req, res) => {
    res.write(form_1)
})

app.get('/form_js', (req, res) => {
    res.write(form_2)
})
*/

app.post('/login', (req, res) => {
    const { name } = req.body
    if (name) {
        return res.status(200).send(`Welcome ${name}`)
    }
    res.status(401).send('Please Provide Credentials')
})

app.get('/api/people/', (req, res) => {
    res.status(200).json({
        success: true,
        data: people
    })
})

app.post('/api/people/', (req, res) => {
    // In POST methods, args are recieved as a req.body
    const {name} = req.body
    if (name) {
        return res.status(200).json({
            success: true,
            data: [...people, name]
        })
    }
    else {
        res.status(400).json({success: false, name: 'timmy'})
    }
})

app.put('/api/people/:id', (req, res) => {
    const { id } = req.params

    const { name } = req.body  
    const person = people.find((person) => person.id === Number(id))
    if (!person) {
        return res.status(404).json({ success: false, msg: `no person with id ${id}` })
    }
    const newPeople = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name
        }
        return person
    })
    res.status(200).json({ success: true, data: newPeople })
})
      
app.delete('/api/people/:id', (req, res) => {
    const person = people.find((person) => person.id === Number(req.params.id))
    if (!person) {
        return res.status(404).json({ success: false, msg: `no person with id ${req.params.id}` })
    }
    const newPeople = people.filter(
        (person) => person.id !== Number(req.params.id)
    )
    return res.status(200).json({ success: true, data: newPeople })
})
  
app.listen(5000, () => {
    console.log('Server is listening on port 5000....')
})
  