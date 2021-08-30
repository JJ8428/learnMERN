const {createReadStream} = require('fs')

const stream = createReadStream('../content/big_file.txt', 
{ // These are opitonal args
    highWaterMark: 100000, // This controls the stream size (Default to 64 Kb)
    encoding: 'utf8', // Optional but recommended for console output
})

stream.on('data', (result) => {
    console.log(result)
})

stream.on('error', (err) => {
    console.log('There is an error')
})