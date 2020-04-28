"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const figlet = __importStar(require("figlet"));
const chalk = __importStar(require("chalk"));
console.clear();
console.log(chalk.yellow(figlet.textSync("Carpe Diem", { horizontalLayout: "full" })));
