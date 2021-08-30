// This is how to create a simple function
const sayThis = (text) => {
    console.log(`I am to print ${text}`) // Context strings are created using ``, not ''
}

// No brackets not needed when exporting only 1 obj/var
module.exports = sayThis