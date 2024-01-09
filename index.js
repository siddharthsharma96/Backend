const http = require("http");

const data = {
  message: "Users Page",
  data: { example: "dummy data 2" },
};
const data1 = {
  message: " Page Not Found Data",
  data: { example: "dummy data 2" },
};
const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === "/user") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data1));
  }
});
const port = 3000;
server.listen(3000, "127.0.0.1", () => {
  console.log("Server Started on port ", port);
});
