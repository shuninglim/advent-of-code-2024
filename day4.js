const fs = require("fs");

let fileData = fs.readFileSync("input.txt", "utf8");

const splitByLines = fileData.split("\r\n");
const wordSearchArray = splitByLines.map((a) => a.split(""));

const numRows = wordSearchArray.length;
const numCols = wordSearchArray[0].length;
let result = 0;

for (let row = 0; row < numRows; row++) {
  for (let i = 0; i < numCols; i++) {
    if (wordSearchArray[row][i] === "X") {
      const right =
        i + 3 < numCols &&
        wordSearchArray[row][i + 1] === "M" &&
        wordSearchArray[row][i + 2] === "A" &&
        wordSearchArray[row][i + 3] === "S";
      const left =
        i - 3 >= 0 &&
        wordSearchArray[row][i - 1] === "M" &&
        wordSearchArray[row][i - 2] === "A" &&
        wordSearchArray[row][i - 3] === "S";
      const down =
        row + 3 < numRows &&
        wordSearchArray[row + 1][i] === "M" &&
        wordSearchArray[row + 2][i] === "A" &&
        wordSearchArray[row + 3][i] === "S";
      const up =
        row - 3 >= 0 &&
        wordSearchArray[row - 1][i] === "M" &&
        wordSearchArray[row - 2][i] === "A" &&
        wordSearchArray[row - 3][i] === "S";
      const upRight =
        i + 3 < numCols &&
        row - 3 >= 0 &&
        wordSearchArray[row - 1][i + 1] === "M" &&
        wordSearchArray[row - 2][i + 2] === "A" &&
        wordSearchArray[row - 3][i + 3] === "S";
      const upLeft =
        i - 3 >= 0 &&
        row - 3 >= 0 &&
        wordSearchArray[row - 1][i - 1] === "M" &&
        wordSearchArray[row - 2][i - 2] === "A" &&
        wordSearchArray[row - 3][i - 3] === "S";
      const downRight =
        i + 3 < numCols &&
        row + 3 < numRows &&
        wordSearchArray[row + 1][i + 1] === "M" &&
        wordSearchArray[row + 2][i + 2] === "A" &&
        wordSearchArray[row + 3][i + 3] === "S";
      const downLeft =
        i - 3 >= 0 &&
        row + 3 < numRows &&
        wordSearchArray[row + 1][i - 1] === "M" &&
        wordSearchArray[row + 2][i - 2] === "A" &&
        wordSearchArray[row + 3][i - 3] === "S";

      result +=
        up + right + left + down + upRight + upLeft + downRight + downLeft;
    }
  }
}

console.log(result)
