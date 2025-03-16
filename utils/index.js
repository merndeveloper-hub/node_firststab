const generatedNumbers = new Set();
let length = 4; // Start with 4-digit numbers

function generateUniqueNumber() {
    let lowerBound = Math.pow(10, length - 1);
    let upperBound = Math.pow(10, length) - 1;

    if (generatedNumbers.size >= (upperBound - lowerBound + 1)) {
        generatedNumbers.clear();
        length++;
    }

    let num;
    do {
        num = Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
    } while (generatedNumbers.has(num));

    generatedNumbers.add(num);
    return num;
}

// Call the function when needed
console.log(generateUniqueNumber()); // Call this whenever you need a new unique number


export default generateUniqueNumber;