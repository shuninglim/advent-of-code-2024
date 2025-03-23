const fs = require("fs");

let fileData = fs.readFileSync("input.txt", "utf8");
const splitByLines = fileData.split("\r\n");
const splitBySpace = splitByLines.map((element) => element.split("   ").map(Number));

const listA = splitBySpace.map((element) => element[0]);
const listB = splitBySpace.map((element) => element[1]);

listA.sort();
listB.sort();

let resultOne = 0;

for (let i = 0; i < listA.length; i++) {
  resultOne += Math.abs(listA[i] - listB[i]);
}

console.log(resultOne);

let resultTwo = 0;

for (const element of listA) {
    const matches = listB.filter((a) => a === element)
    resultTwo += matches.length * element
}

console.log(resultTwo);
