const fs = require('fs');
const todayTime = require('./todayTime.json');
const DB = require('./DB.json');
const allTime = require('./allTime.json');

// const addAllTime = () => {
//   DB.push(todayTime);
//   fs.writeFileSync("DB.json", JSON.stringify(DB, null, 2));
  
//   for (let [key, value] of Object.entries(todayTime)){
//     allTime[key] += value;
//   }

//   fs.writeFileSync("allTime.json", JSON.stringify(allTime, null, 2));

//   fs.writeFileSync("todayTime.json", '{}');
// }

// addAllTime();

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

const reverseAssociateTable = {}
for (let [key, value] of Object.entries(associateTable)) {
  reverseAssociateTable[value] = key;
}

const postAllTime = () => {
  let toPost = {};
  for (let [key, value] of Object.entries(allTime)) {
    toPost[reverseAssociateTable[key]] = value;
  }
  let jsonToPost = JSON.stringify(toPost);

  let elemToPost = jsonToPost.matchAll(/"(.+?)":(\d+\b)/g) || [];

  let strToPost = '';

  for(let elem of elemToPost) {
    strToPost += elem[1] + ': ' + elem[2] + ' (' + parseInt(elem[2]/60) + ' ч, ' + elem[2]%60 + ' мин.)' + '\n';
  }

  fs.writeFileSync("BLABLABLA.json", strToPost);
}

postAllTime();