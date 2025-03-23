const fs = require("fs");

let fileData = fs.readFileSync("input.txt", "utf8");

const mulRe = /mul\(\d+,\d+\)/g;
const numbersRe = /\d+/g;
const doRe = /do\(\)/g;
const dontRe = /don't\(\)/g;

let product = 0;

const doStrings = [...fileData.matchAll(doRe)]; 
const doIndexes = doStrings.map((a) => a.index).reverse();
doIndexes.push(0);
console.log(doIndexes);
const dontStrings = [...fileData.matchAll(dontRe)];
const dontIndexes = dontStrings.map((a) => a.index);
dontIndexes.push(fileData.length);
dontIndexes.reverse();
console.log(dontIndexes);

let startIndex = -2;
let stopIndex = -1;

while (doIndexes.length !== 0 && dontIndexes.length !== 0) {
  while (startIndex < stopIndex) startIndex = doIndexes.pop();
  while (stopIndex < startIndex) stopIndex = dontIndexes.pop();
  console.log(startIndex, stopIndex);
  findMulStrings(startIndex, stopIndex);
}

function findMulStrings(startIndex, stopIndex) {
  const matches = [...fileData.slice(startIndex, stopIndex).matchAll(mulRe)];
  matches.forEach((a) => multiplyMulString(a[0]));
}

function multiplyMulString(string) {
  const numbers = [...string.matchAll(numbersRe)];
  if (numbers.length !== 2) {
    console.log(string + " is not expected");
    return;
  }
  product += Number(numbers[0][0]) * Number(numbers[1][0]);
}

console.log(product);
