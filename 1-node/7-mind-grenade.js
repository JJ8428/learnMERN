var test = 'AAABBBCCC'

function testing() {
    console.log(test)
    return 2
}

testing()

// This is a simple function. Exporting this on a file will only wrap it up and execute
// We will be unable to refer the function, the function's output (if any), and any other variables