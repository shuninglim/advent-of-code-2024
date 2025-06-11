import fs from "fs";

interface Product {
  product_uid: string;
  retail_price: {
    price: number;
  };
}
interface Line {
  product_uid: string;
  quantity: number;
  price: number;
}

interface Output {
  lines: Line[];
  total_price: number;
  total_count: number;
}

const url =
  "https://s3.eu-west-1.amazonaws.com/hackajob-assets1.p.hackajob/challenges/sainsbury_products/products.json";
function getData() {
  return fetch(url)
    .then((res) => res.json())
    .then((out) => parseData(out))
    .catch((err) => console.log(err));
}

function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

// these two functions are identical, both return a promise
// the async keyword turns the return type into a promise, which is needed bc we are awaiting
// .then() always returns a promise
async function getDataFromFileAsync() {
  const out = await readFilePromise("products.json");
  return parseData(JSON.parse(out as string));
}
function getDataFromFile() {
  return readFilePromise("products.json").then((out) =>
    parseData(JSON.parse(out as string))
  );
}

function parseData(data: Product[]) {
  const productData = new Map<string, number>();
  for (let product of data) {
    productData.set(product.product_uid, product.retail_price?.price);
  }
  return productData;
}

async function run(input: Array<string>) {
  const productData = await getDataFromFile();
  let output: Output = { lines: [], total_price: 0, total_count: 0 };
  let totalPrice = 0;
  let totalCount = 0;
  const desiredProductMap = new Map<string, number>();
  for (let desiredProduct of input) {
    desiredProductMap.set(
      desiredProduct,
      (desiredProductMap.get(desiredProduct) || 0) + 1
    );
  }
  for (let [uuid, quantity] of desiredProductMap) {
    const price = quantity * (productData?.get(uuid) || 0);
    totalPrice += price;
    totalCount += quantity;
    output.lines.push({ product_uid: uuid, quantity: quantity, price: price });
  }
  output.total_price = totalPrice;
  output.total_count = totalCount;
  return JSON.stringify(output);
}
//output:
// lines: {product_uid: "", quantity:"", price:""},
// total_price: 35, total_count: 4

run(["2444888", "2444888", "7916746"]).then((out) => console.log(out));
