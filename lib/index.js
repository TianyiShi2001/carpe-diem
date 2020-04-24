"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const figlet = require("figlet");
const chalk = require("chalk");
console.clear();
console.log(chalk.yellow(figlet.textSync("Carpe Diem", { horizontalLayout: "full" })));
