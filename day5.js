const fs = require("fs");

let fileData = fs.readFileSync("test.txt", "utf8");
let [rules, updates] = fileData.split("\r\n\r\n");
rules = rules.split("\r\n").map((a) => a.split("|").map((b) => Number(b)));
updates = updates.split("\r\n").map((a) => a.split(",").map((b) => Number(b)));

let correctUpdates = [];
let wrongUpdates = [];
update: for (const update of updates) {
  for (const rule of rules) {
    // page rule[0] must appear before page rule[1], so if pages are repeated,
    // we care about the latest rule[0] and the earliest rule[1]
    const indexOne = update.findLastIndex((a) => a === rule[0]);
    const indexTwo = update.findIndex((a) => a === rule[1]);
    if (indexOne !== -1 && indexTwo !== -1 && indexTwo < indexOne) {
      wrongUpdates.push(update);
      continue update;
    }
  }
  correctUpdates.push(update);
}

const partOneResult = sumMiddlePage(correctUpdates);
console.log(partOneResult);

// try bubble sort? this would work if there is a rule for every pair
for (const update of wrongUpdates) {
  for (let i = 0; i < update.length - 1; i++) {
    for (let j = 0; j < update.length - i - 1; j++) {
      for (const rule of rules) {
        if (update[j] === rule[1] && update[j + 1] === rule[0]) {
          const tmp = update[j + 1];
          update[j + 1] = update[j];
          update[j] = tmp;
        }
      }
    }
  }
}
console.log(wrongUpdates);
const partTwoResult = sumMiddlePage(wrongUpdates);
console.log(partTwoResult);

function sumMiddlePage(updates) {
  let result = 0;
  for (const update of updates) {
    result += update[Math.round(update.length / 2) - 1];
  }
  return result;
}
