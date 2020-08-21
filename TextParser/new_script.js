const fs = require('fs')
const todayTime = require('./todayTime.json')

//const fileContent = fs.readFileSync("message1.txt", "utf8") //input

fs.writeFileSync('results.json', '') //output file

//const listOfAllDeedsFile = fs.readFileSync("analyzer_output.txt", "utf8") //from analyzer.js

//const listOfAllDeeds = listOfAllDeedsFile.split('\n')

const associateTable = {
  'Чтение': 'reading',
  'Фотошоп': 'photoshop',
  'Английский': 'engilsh',
  'Японский': 'japanese',
  'Программирование': 'programming',
  'Видеомейкерство': 'video',
  'Рисование': 'drawing',
  'Каллиграфия': 'calligraphy',
  'Пост в Телеграм-канал': 'telegramPost',
  'Статья на CR': 'crPost',
  'Обучение слепой печати': 'blindPrint',
}

const parseFullData = (fileContent) => {

  const resultMap = [];

  const todayData = todayTime || {};

  const dayData = JSON.parse(fs.readFileSync("rd71data.json", "utf8"));

//  const elems = fileContent.matchAll(/^(?<deed>.+?): (?:(?<hours>\d+\b) ча[c|сов|са])?\s?(?:(?<mins>\d+\b) минут)?\./gm) || [];

  //const elems = fileContent.matchAll(/^(?<deed>.+?): (?:(?<hours>\d+\b) ча[c|сов|са])?\s?(?:(?<mins>\d+\b) минут)?/gm) || [];

  const elems = fileContent.matchAll(/^(?<deed>.+?): ((?:(?<hours>\d+?) час.+?)?\s?(?:(?<mins>\d+?) минут)?).\s+?$/gm) || [];

  for(let elem of elems) {
    //let deed = elem.groups;
   // console.log(elem.groups)

    let {deed, hours, mins} = elem.groups;
    console.log(deed);
    if (deed === 'Физра') {
      continue;
    }

    // if (deed === 'Видеомейкерство') {
    //   console.log(hours, mins)
    // }

    hours = hours ? hours : 0;
    mins = mins ? mins : 0;
    const sumDeed = +hours * 60 + +mins;
    dayData[associateTable[deed]] += sumDeed;
    
    todayData[associateTable[deed]] = todayData[associateTable[deed]] ? todayData[associateTable[deed]] : 0;
    todayData[associateTable[deed]] += sumDeed;
  }

 resultMap.push(dayData);

 fs.writeFileSync("todayTime.json", JSON.stringify(todayData, null, 2));

 return resultMap;
}

//parseFullData()

const fileContent = fs.readFileSync("message1.txt", "utf8");

fs.appendFileSync('results.json', JSON.stringify(parseFullData(fileContent), null, 2))