const {readFile, writeFile} = require('fs');

console.log('Starting async task')

// This is a callback function
readFile('./content/random_1.txt', 'utf8', (err, result) => {
    if (err) {
        console.log(err);
        return
    }
    // console.log('readfile 1 is fin')
    const output_1 = result;
    readFile('./content/random_2.txt', 'utf8', (err, result) => {
        if (err) {
            console.log(err);
            return
        }
        // console.log('readfile 2 is fin')
        const output_2 = result;
        writeFile(
            './content/result_write-sync.txt', 
            `${output_1} ${output_2}`,
        (err, result) => {
            if (err) {
                console.log(err);
                return
            }
            // console.log('writefile is fin')
            console.log('Ending async task')
            console.log(result); // Writing to a file nothing to return
        })
    })
})

// This will execute for before it finishes the async task above
console.log('Last line of this file')