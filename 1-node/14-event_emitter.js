const EventEmitter = require('events');

// These are a core building block both front and back end
const customEmitter = new EventEmitter()

customEmitter.on('response', (name, id) => {
    console.log(`'response' signal recieved with the args: ${name} and ${id}`)
})
customEmitter.on('response', () => {
    console.log('\'response\' signal recieved again')
})


// You can only emit the event after the customEmitter is told to listen for that event
customEmitter.emit('response', 'john', 34)

// A bunch of modules already have built-in default events