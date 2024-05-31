const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const pathDir = path.join(__dirname, "public");

fs.writeFileSync(path.join(pathDir, "countMain.txt"), "0");
fs.writeFileSync(path.join(pathDir, "countAbout.txt"), "0");

let countMain = Number(fs.readFileSync(path.join(pathDir, "countMain.txt")));
let countAbout = Number(fs.readFileSync(path.join(pathDir, "countAbout.txt")));
//const countPageNotFound = fs.readFileSync(path.join(pathDir, "countPageNotFound.txt"));

app.get("/", (req, res) => {
    fs.writeFileSync(path.join(pathDir, "countMain.txt"), `${++countMain}`);
    res.send(`
<h1>Корневая страница</h1>
<h2>Просмотров на корневой странице ${countMain}</h2>
<a href="/about">Перейти на страницу about</a>
`);
});

app.get("/about", (req, res) => {
    fs.writeFileSync(path.join(pathDir, "countAbout.txt"), `${++countAbout}`);
    res.send(`
<h1>About</h1>
<h2>Просмотров на странице About ${countAbout}</h2>
<a href="/">Перейти на корневую страницу</a>
`);
});

app.use(express.static("public"));
const port = 3000;

app.listen(port);
console.log(`Сервер слушает порт ${port}`);
