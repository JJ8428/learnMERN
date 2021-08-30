const {readFile} = require('fs');

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

getText('./content/random_1.txt')
    .then((result) => console.log(result))
    .catch((err) => console.log(err))

const start = async() => {
    const first = await getText('./content_random_1.txt')
    const second = await getText('./content_random_2.txt')
    console.log(first, ' | ', second)
    // This is much better than stacking call backs
    // Combining awaits and promises, prevents callback hell
}