const { error } = require("console");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const pathDir = path.join(__dirname, "public");

try {
    fs.writeFileSync(path.join(pathDir, "countMain.txt"), "0");
    fs.writeFileSync(path.join(pathDir, "countAbout.txt"), "0");
} catch (error) {
    console.error(error);
}

let countMain = Number(
    fs.readFileSync(path.join(pathDir, "countMain.txt"), "utf-8")
);
let countAbout = Number(
    fs.readFileSync(path.join(pathDir, "countAbout.txt"), "utf-8")
);

app.get("/", (req, res) => {
    try {
        fs.writeFileSync(path.join(pathDir, "countMain.txt"), `${++countMain}`);
        res.send(`
    <h1>Корневая страница</h1>
    <h2>Просмотров на корневой странице ${countMain}</h2>
    <a href="/about">Перейти на страницу about</a>
    `);
    } catch (error) {
        console.error(error);
    }
});

app.get("/about", (req, res) => {
    try {
        fs.writeFileSync(
            path.join(pathDir, "countAbout.txt"),
            `${++countAbout}`
        );
        res.send(`
    <h1>About</h1>
    <h2>Просмотров на странице About ${countAbout}</h2>
    <a href="/">Перейти на корневую страницу</a>
    `);
    } catch (error) {
        console.error(error);
    }
});

app.use(express.static("public"));
const port = 3000;

app.listen(port);
console.log(`Сервер слушает порт ${port}`);
