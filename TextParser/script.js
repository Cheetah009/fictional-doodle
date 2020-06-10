const fs = require('fs')

let fileContent = fs.readFileSync("messages.html", "utf8")

let str = fileContent

console.log(str.length)

let newstr = str.matchAll(/\#ИтогиДня.+?<\/div>/gs)

//console.log(Array.from(newstr).length)
// /<div class="text">\r\n<a href="" onclick="return ShowHashtag(.*?)<\/div>/gs

//.+? <\/div>

// for (let elem of newstr) {
//   console.log(elem[0])
// }

fs.writeFileSync('results.txt', '')

let i = 0;
for (let deedElem of newstr) {
  console.log(i)
  i++
  let beforenewerstr = deedElem[0].replace(/<[^>]*>/g, "")
  let newerstr = beforenewerstr.replace(/\d\./g, '')

  let Itogs = newerstr.match(/#ИтогиДня (\d+\b)/) || []

  let reading = newerstr.match(/Чтение. (?:(\d+\b) ча[c|сов|са])?\s?(?:(\d+\b) минут)?/) || []
  //console.log(reading[2])
  let [readH, readM] = [reading[1], reading[2]]
  if (readH === undefined) {readH = 0}
  if (readM === undefined) {readM = 0}

  let elems = newerstr.matchAll(/- (?<deed>.+?): (?:(?<hours>\d+\b) ча[c|сов|са])?\s?(?:(?<mins>\d+\b) минут)?/g) || []

  fs.appendFileSync('results.txt',Itogs[1]+'\n')
  fs.appendFileSync('results.txt',`Чтение\t${+readH * 60+ +readM}\n`);

  for(let elem of elems) {
    let {deed, hours, mins} = elem.groups;

    if (hours === undefined) {hours = 0}
    if (mins === undefined) {mins = 0}

    fs.appendFileSync('results.txt',`${deed}\t${ +hours * 60+ +mins}\n`);
  }

  //if (i === 3) break
}


//let newerstr = newstr[0].replace(/<[^>]*>/g, "")

///#ИтогиДня.*<\/div>/s 

// let Itogs = newerstr.match(/#ИтогиДня (\d+\b)/)
// let elems = newerstr.matchAll(/- (?<deed>.+?): (?:(?<hours>\d+\b) ча[c|сов|са])?\s?(?:(?<mins>\d+\b) минут)?/g)

// // /- (?<deed>.+)?: (?:(?<hours>\d+\b) ча[c|сов|са])?\s?(?:(?<mins>\d+\b) минут)?/g
// // /- (.+?): (\d+\b ча[c|сов|са])?\s?(\d+\b минут)?/g

// //- (.+?\b):   (\d+\b минут)?    

// //elems = Array.from(elems)

// // console.log(newerstr)
// fs.appendFileSync('results.txt',Itogs[1]+'\n')

// for(let elem of elems) {
//   let {deed, hours, mins} = elem.groups;

//   if (hours === undefined) {hours = 0}
//   if (mins === undefined) {mins = 0}

//   fs.appendFileSync('results.txt',`${deed}\t${hours}\t${mins}\n`);
//   // первый вывод: 30.10.2019
//   // второй: 01.01.2020
// }

// //console.log(elems)

// // let str = "Любо, братцы, любо!";

// // console.log( str.match(/любо/gi) ); // Любо,любо (массив из 2х подстрок-совпадений)

// //fs.writeFileSync('results.txt',)