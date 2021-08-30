const {readFile, writeFile, write} = require('fs').promises;
// const util = require('util');

/*
const getText = (path) => {
    return new Promise((resolve, reject) => {
        // (err, data) is for call backs
        readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

// A simple way of adding a promise to an aysnc function
const readFilePromise = util.promisify(readFile)
const writeFilePromise = util.promisify(writeFile)
*/

const start = async() => {
    // await makes the async function block on its thread
    const first = await writeFile('./content_random_1.txt', 'utf8')
    const second = await readFile('./content_random_2.txt', 'utf8')
    await writeFile('./content/result_mind-grenade.txt', 'This is confusing!!!')
    console.log(first, ' | ', second)
    // This is much better than stacking call backs
    // Combining awaits and promises, prevents callback hell
}