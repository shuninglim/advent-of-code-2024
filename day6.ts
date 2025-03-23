import fs from "fs";

let fileData = fs.readFileSync("input.txt", "utf8");
let labMap = fileData.split("\r\n").map((a) => a.split(""));

const labHeight = labMap.length;
const labWidth = labMap[0].length;

class Point {
  xCoord: number;
  yCoord: number;
  constructor(y: number, x: number) {
    this.xCoord = x;
    this.yCoord = y;
  }
  get coordinates(): string {
    return this.xCoord.toString() + "," + this.yCoord.toString();
  }
  static getPoint(coordinates:string): Point {
    const coords = coordinates.split(",").map(Number);
    return new Point(coords[1],coords[0])
  }
  outOfBounds(): boolean {
    return (
      this.xCoord < 0 ||
      this.yCoord < 0 ||
      this.xCoord >= labWidth ||
      this.yCoord >= labHeight
    );
  }
}

class Guard {
  direction: string;
  location: Point;
  constructor(y: number, x: number, direction: string) {
    this.location = new Point(y, x);
    this.direction = direction;
  }
  moveUp() {
    this.location.yCoord -= 1;
  }
  moveDown() {
    this.location.yCoord += 1;
  }
  moveLeft() {
    this.location.xCoord -= 1;
  }
  moveRight() {
    this.location.xCoord += 1;
  }
}

const visited: Set<string> = new Set();
let guard: Guard | undefined = undefined;

for (let i = 0; i < labMap.length; i++) {
  for (let j = 0; j < labMap[i].length; j++) {
    if (
      labMap[i][j] === "^" ||
      labMap[i][j] === ">" ||
      labMap[i][j] === "<" ||
      labMap[i][j] === "v"
    ) {
      guard = new Guard(i, j, labMap[i][j]);
      break;
    }
  }
  if (guard !== undefined) {
    break;
  }
}

if (guard !== undefined) {
  while (!guard.location.outOfBounds()) {
    switch (guard.direction) {
      case "^":
        if (
          guard.location.yCoord === 0 ||
          labMap[guard.location.yCoord - 1][guard.location.xCoord] !== "#"
        ) {
          visited.add(guard.location.coordinates);
          guard.moveUp();
        } else {
          guard.direction = ">";
        }
        break;
      case ">":
        if (
          guard.location.xCoord === labWidth - 1 ||
          labMap[guard.location.yCoord][guard.location.xCoord + 1] !== "#"
        ) {
          visited.add(guard.location.coordinates);
          guard.moveRight();
        } else {
          guard.direction = "v";
        }
        break;
      case "v":
        if (
          guard.location.yCoord === labHeight - 1 ||
          labMap[guard.location.yCoord + 1][guard.location.xCoord] !== "#"
        ) {
          visited.add(guard.location.coordinates);
          guard.moveDown();
        } else {
          guard.direction = "<";
        }
        break;
      case "<":
        if (
          guard.location.xCoord === 0 ||
          labMap[guard.location.yCoord][guard.location.xCoord - 1] !== "#"
        ) {
          visited.add(guard.location.coordinates);
          guard.moveLeft();
        } else {
          guard.direction = "^";
        }
        break;
    }
  }
}

console.log(visited.size);
