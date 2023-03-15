var http = require("http");
var hostname = "127.0.0.1";
var port = "8080";
//서버 생성

const server = http.createServer((req, res) => {
  const path = req.url;
  const method = req.method; // 안 쓰면 get
  if (path === "/products") {
    if (method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      const products = JSON.stringify([{ name: "멍멍하네스", price: "23,000", seller: "도기멍" }]);
      res.end(products);
    } else if (method === "POST") {
      res.end("생성되었습니다");
    }
  }
  res.end("Good Bye");
});

server.listen(port, hostname);
console.log("server on!");
