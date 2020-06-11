const fs = require('fs')

let fileContent = fs.readFileSync("results.txt", "utf8")

let strWithoutNumbers = fileContent.replace(/[\d+|\t]/g, '')

let strSet = new Set()

let strArray = strWithoutNumbers.split('\n')

for (let elem of strArray) {
  strSet.add(elem)
}

let result = Array.from(strSet)

fs.writeFileSync('analyzer_output.txt', result.join('\n'))