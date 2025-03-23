const fs = require("fs");

let fileData = fs.readFileSync("input.txt", "utf8");
const reports = fileData.split("\r\n");
const reportsArray = reports.map((element) => element.split(" ").map(Number));

let safeLevels = 0;
const NO_SKIP_YET = 0;
const SKIP_USED = 1;

for (let report of reportsArray) {
  if (
    checkIncreasing(report.length - 1, report, NO_SKIP_YET) ||
    checkDecreasing(report.length - 1, report, NO_SKIP_YET) ||
    checkIncreasing(report.length - 2, report, SKIP_USED) || //skip the last one
    checkDecreasing(report.length - 2, report, SKIP_USED)
  ) {
    safeLevels += 1;
  }
}

console.log(safeLevels);

function checkIncreasing(i, report, skipped) {
  if (i === 0) {
    return true;
  } else if (report[i] >= report[i - 1] + 1 && report[i] <= report[i - 1] + 3) {
    return checkIncreasing(i - 1, report, skipped);
  } else if (skipped === NO_SKIP_YET) {
    if (i === 1) return true;
    if (report[i] >= report[i - 2] + 1 && report[i] <= report[i - 2] + 3)
      return checkIncreasing(i - 2, report, SKIP_USED); //skip i-1
  } else return false;
}

function checkDecreasing(i, report, skipped) {
  if (i === 0) {
    return true;
  } else if (report[i] <= report[i - 1] - 1 && report[i] >= report[i - 1] - 3) {
    return checkDecreasing(i - 1, report, skipped);
  } else if (skipped === NO_SKIP_YET) {
    if (i === 1) return true;
    else if (report[i] <= report[i - 2] - 1 && report[i] >= report[i - 2] - 3)
      return checkDecreasing(i - 2, report, SKIP_USED); //skip i-1
  } else return false;
}
