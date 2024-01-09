const fs = require("fs");
// fs is used for reading and writing

// blocking code
// readFileSync means Its a synchronous code
// Synchronous means It will line by lione
const readData = fs.readFileSync("./input.txt", "utf-8");
const readData1 = fs.readFileSync("./output.json", "utf-8");
console.log(readData);
console.log(readData1);
console.log("Blocking code ");
// its Asynchronous
fs.readFile("./input.txt", "utf-8", (err, data) => {
  console.log(data);
});
console.log("Non-Blocking code ");
