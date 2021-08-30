const express = require('express')
const router = express.Router()

router.get('/api/people/', (req, res) => {
    res.status(200).json({
        success: true,
        data: people
    })
})

router.post('/api/people/', (req, res) => {
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

router.put('/api/people/:id', (req, res) => {
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
      
router.delete('/api/people/:id', (req, res) => {
    const person = people.find((person) => person.id === Number(req.params.id))
    if (!person) {
        return res.status(404).json({ success: false, msg: `no person with id ${req.params.id}` })
    }
    const newPeople = people.filter(
        (person) => person.id !== Number(req.params.id)
    )
    return res.status(200).json({ success: true, data: newPeople })
})

module.export = router