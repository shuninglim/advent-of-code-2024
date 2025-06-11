import fs from "fs";

const input = fs
  .readFileSync("input.txt", "utf-8")
  .split("\r\n")
  .map((a) => a.split("").map(Number));
const trailheads: number[][] = [];
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    if (input[i][j] === 0) {
      trailheads.push([i, j]);
    }
  }
}

const directions = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];
function inGrid(x: number, y: number): boolean {
  return x >= 0 && y >= 0 && x < input.length && y < input[0].length;
}

let score = 0;
let rating = 0;
for (let [x, y] of trailheads) {
  const summits = new Set<string>();
  function dfs(x: number, y: number) {
    if (input[x][y] === 9) {
      summits.add(x + "," + y);
      rating++;
    } else {
      for (let [dx, dy] of directions) {
        if (
          inGrid(x + dx, y + dy) &&
          input[x + dx][y + dy] === input[x][y] + 1
        ) {
          dfs(x + dx, y + dy);
        }
      }
    }
  }

  dfs(x, y);
  score += summits.size;
}

console.log(score);
console.log(rating);
