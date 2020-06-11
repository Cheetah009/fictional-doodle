const fs = require('fs')

const fileContent = fs.readFileSync("messages.html", "utf8") //input

const listOfDays = fileContent.matchAll(/\#ИтогиДня.+?<\/div>/gs)

fs.writeFileSync('results.txt', '') //output file

const listOfAllDeedsFile = fs.readFileSync("analyzer_output.txt", "utf8") //from analyzer.js

const listOfAllDeeds = listOfAllDeedsFile.split('\n')

let resultMapElem = new Map() //elem of the result array

resultMapElem.set('День', 0)
resultMapElem.set('Чтение', 0)

for (let elem of listOfAllDeeds) {
  resultMapElem.set(elem, 0)
}

resultMapElem.set('Настроение', '')

let resultArray = []

for (let dayRaw of listOfDays) {
  let MapElem = new Map(resultMapElem) //copy of elem with all keys

  const strWithoutHtmlTags = dayRaw[0].replace(/<[^>]*>/g, "")
  const dayinfo = strWithoutHtmlTags.replace(/\d\./g, '')

  const dayNumber = dayinfo.match(/#ИтогиДня (\d+\b)/) || [0,0]

  fs.appendFileSync('results.txt',dayNumber[1]+'\n')
  MapElem.set('День', dayNumber[1])

  const reading = dayinfo.match(/Чтение. (?:(\d+\b) ча[c|сов|са])?\s?(?:(\d+\b) минут)?/) || []

  let [readH, readM] = [reading[1], reading[2]]
  if (readH === undefined) {readH = 0}
  if (readM === undefined) {readM = 0}

  const readSum = +readH * 60+ +readM

  fs.appendFileSync('results.txt',`Чтение\t${readSum}\n`);
  MapElem.set('Чтение', readSum)

  const allDeeds = dayinfo.matchAll(/- (?<deed>.+?): (?:(?<hours>\d+\b) ча[c|сов|са])?\s?(?:(?<mins>\d+\b) минут)?/g) || []

  for(let elem of allDeeds) {
    let {deed, hours, mins} = elem.groups;

    if (hours === undefined) {hours = 0}
    if (mins === undefined) {mins = 0}

    const sumDeed = +hours * 60+ +mins

    fs.appendFileSync('results.txt',`${deed}\t${sumDeed}\n`)
    MapElem.set(`${deed}`, sumDeed)
  }

  const mood = dayinfo.match(/Настроение. (.+) Доп/) || [0,'']

  fs.appendFileSync('results.txt',`Настроение\t${mood[1]}\n`);
  MapElem.set('Настроение', mood[1])
  
  resultArray.push(MapElem)
}

fs.writeFileSync('resultsForExcel.txt', '')

for (let deed of resultArray[0].keys()){ //Head of the Table
  fs.appendFileSync('resultsForExcel.txt',`${deed}\t`);
}

fs.appendFileSync('resultsForExcel.txt',`\n`);

for (let day of resultArray){
  for(let value of day.values()){
    fs.appendFileSync('resultsForExcel.txt',`${value}\t`);
  }
  fs.appendFileSync('resultsForExcel.txt',`\n`);
}