// Importing the variables and the functions
// We don't need the extensions
const names = require('./4-names')
const sayThis = require('./5-utils')
const data = require('./6-alt-flavor')

sayThis(names.full_name)
sayThis(names.nick_name)
console.log(data)

// We cannot refer to anything imported here
test = require('./7-mind-grenade')
console.log(test) // test will be simply {}