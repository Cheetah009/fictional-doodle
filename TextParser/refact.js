const fs = require('fs')

const JSONorNOT = require('./AllData.json')

const JSONorNOT2 = require('./AllData2.json')

JSONorNOT2.push(
  {
    ALLLO: 42
  }
)

fs.writeFileSync("AllData2.json", JSON.stringify(JSONorNOT2, null, 2));

console.log(JSONorNOT2)

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
  'Просмотр онлайн-лекции про видеомейкерство': 'onlineLectureVideo',
  'Просмотр онлайн-лекции по QA': 'onlineLectureQA',
  'Обучение слепой печати': 'blindPrint',
}

const parseFullData = () => {
  const fileContent = fs.readFileSync("messages.html", "utf8");
  const newstr = fileContent.matchAll(/\#ИтогиДня.+?<\/div>/gs);

  const resultMap = [];

  for (let deedElem of newstr) {
    const dayData = {};

    const beforenewerstr = deedElem[0].replace(/<[^>]*>/g, "");
    const newerstr = beforenewerstr.replace(/\d\./g, '');
    const Itogs = newerstr.match(/#ИтогиДня (\d+\b)/) || [0,0];
    const reading = newerstr.match(/Чтение. (?:(\d+\b) ча[c|сов|са])?\s?(?:(\d+\b) минут)?/) || [];
    const readH = reading[1] ? reading[1] : 0;
    const readM = reading[2] ? reading[2] : 0;
    const readSum = +readH * 60 + +readM;
    const mood = newerstr.match(/Настроение. (.+) Доп/) || []

    dayData.day = +Itogs[1];
    dayData.reading = readSum;
    dayData.mood = mood[1];

    const elems = newerstr.matchAll(/- (?<deed>.+?): (?:(?<hours>\d+\b) ча[c|сов|са])?\s?(?:(?<mins>\d+\b) минут)?/g) || [];
    for(let elem of elems) {
      let {deed, hours, mins} = elem.groups;
      hours = hours ? hours : 0;
      mins = mins ? mins : 0;
      const sumDeed = +hours * 60+ +mins;
      dayData[associateTable[deed]] = sumDeed;
    }

    resultMap.push(dayData);
  }
  return resultMap;
}

//fs.writeFileSync("AllData2.json", JSON.parse(JSONorNOT[0]));
//fs.writeFileSync("AllData.json", JSON.stringify(parseFullData(), null, 2));
//console.log(parseFullData());