"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const fuzzy = require("fuzzy");
const chrono = require("chrono-node");
const data = require("../data");
// ordered by occurence
function getTasks(algorithm = "recent") {
    switch (algorithm) {
        case "recent": {
            const log = data.getLog();
            const last100 = log
                .slice(log.length - 100)
                .map((e) => e.task)
                .reverse();
            return last100.reduce((arr, task) => {
                if (arr.indexOf(task) === -1) {
                    arr.push(task);
                }
                return arr;
            }, []);
        }
        default:
            break;
    }
    return Object.keys(data.getTaskDict());
}
function getTaskAttrsAsString(taskName) {
    let taskDict = data.getTaskDict();
    if (taskDict[taskName]) {
        if (taskDict[taskName]["attrs"]) {
            return taskDict[taskName]["attrs"].join(", ");
        }
    }
    return "";
}
exports.getTaskAttrsAsString = getTaskAttrsAsString;
function autocompleteTask(answers, input) {
    return __awaiter(this, void 0, void 0, function* () {
        input = input || "";
        let fuzzyResult = fuzzy.filter(input, getTasks());
        let res = fuzzyResult.map((el) => el.original);
        return res.length !== 0 ? res : [input];
    });
}
exports.autocompleteTask = autocompleteTask;
function autocompleteDate(answers, input) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!input)
            return ["e.g. 'yesterday 4pm', '2 days ago 14:30', 'last Monday 11:20'"];
        let res = chrono.parseDate(input);
        return res ? [res.toString()] : ["e.g. 'yesterday 4pm', '2 days ago 14:30', 'last Monday 11:20'"];
    });
}
exports.autocompleteDate = autocompleteDate;
function autocompleteDuration(answers, input) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!input)
            return ["skip", "1 Hour", "30 Minutes", "25 Minutes", "10 Minutes"];
        if (+input)
            return input < 4 ? [input + " Hours"] : [input + " Minutes"];
        let parseResult = utils_1.parseDuration(input);
        return parseResult ? [utils_1.secondsToHHMM(parseResult)] : ["Example input: '2h30m', '2hrs 20min', '4 hrs 10min'"];
    });
}
exports.autocompleteDuration = autocompleteDuration;
