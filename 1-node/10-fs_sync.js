// This is reading a file with BLOCKING
const {readFileSync, writeFileSync} = require('fs');
const fs = require('fs')

// Webdevs typically use NON-BLOCKING

const rand_1 = readFileSync('./content/random_1.txt', 'utf8')
const rand_2 = readFileSync('./content/random_2.txt', 'utf8')

console.log(rand_1, rand_2)

writeFileSync(
    './content/result_write-sync.txt',
    `${rand_1} ${rand_2}`,
    // {flag: 'a'}, // This is a optional argument we can include to append to a file
)