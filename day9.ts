import fs from "fs";

const input = fs.readFileSync("test.txt", "utf-8").split("").map(Number);

const expandedInput: Array<number | "."> = [];
for (let i = 0; i < input.length; i++) {
  if (i % 2 === 0) {
    for (let j = 0; j < input[i]; j++) expandedInput.push(i / 2);
  } else {
    for (let j = 0; j < input[i]; j++) expandedInput.push(".");
  }
}

//console.log(expandedInput);

function partOneReformat() {
  for (let i = 0; i < expandedInput.length; i++) {
    if (expandedInput[i] === ".") {
      let tmp: number | "." = ".";
      while (tmp === ".") tmp = expandedInput.pop() ?? ".";
      expandedInput[i] = tmp;
    }
  }
}

function partTwoReformat() {
//Math.floor(input.length/2)
}

partOneReformat();
//console.log(expandedInput);

let checksum = 0;
for (let i = 0; i < expandedInput.length; i++) {
  if (typeof expandedInput[i] === "number")
    checksum += i * (expandedInput[i] as number);
}

console.log(checksum);
