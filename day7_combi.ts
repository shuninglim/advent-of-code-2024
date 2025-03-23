import fs from "fs";

const fileData = fs.readFileSync("test.txt", "utf8");
const equations = fileData.split("\r\n");

let answer = 0;

for (const equation of equations) {
  const target = Number(equation.split(":")[0]);
  //console.log("target is " + target);
  const inputs: Array<number> = equation.split(" ").map(Number).slice(1);

  for (let i = 0; i < 3 ** (inputs.length - 1); i++) {
    let result = inputs[0];
    for (let j = 0; j < inputs.length - 1; j++) {
      if (Math.floor(i / 3 ** j) % 3 === 0) {
        result += inputs[j + 1];
      } else if (Math.floor(i / 3 ** j) % 3 === 1) {
        result *= inputs[j + 1];
      } else {
        result = Number(
          result.toString() + inputs[j + 1].toString()
        );
      }
    }
    //console.log(result);
    if (result === target) {
      answer += result;
      break;
    }
  }
}

console.log(answer);
