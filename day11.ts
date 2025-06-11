import fs from "fs";

let i = 1;
const maxSteps = 75;

function processStep(i: number) {
  return new Promise<void>((resolve) => {
    let count = 0;
    let reader = fs.createReadStream(`./day11/output${i - 1}.txt`);
    let writer = fs.createWriteStream(`./day11/output${i}.txt`);
    reader.on("data", function (chunk) {
      let input = chunk.toString().split(" ").map(Number).slice(1);
      for (let stone of input) {
        const numberLength = String(stone).length;
        if (stone === 0) {
          writer.write(" " + 1);
          count++;
        } else if (numberLength % 2 === 0) {
          writer.write(" " + String(stone).slice(0, numberLength / 2));
          writer.write(" " + String(stone).slice(numberLength / 2));
          count += 2;
        } else {
          writer.write(" " + stone * 2024);
          count++;
        }
      }
    });
    reader.on("end", () => {
      writer.end();
      writer.on("finish", () => {
        console.log(i + ", " + count);
        resolve();
      });
    });
  });
}

async function run() {
  for (let i = 1; i <= maxSteps; i++) {
    await processStep(i);
  }
}

run();
