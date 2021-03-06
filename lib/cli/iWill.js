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
const inquirer = require("inquirer");
const utils_1 = require("../utils");
const autocomplete_1 = require("./autocomplete");
const luxon_1 = require("luxon");
const CarpeDiemData = require("../data");
inquirer.registerPrompt("autocomplete", require("inquirer-autocomplete-prompt"));
function getIWillOptionsInteractive() {
    return __awaiter(this, void 0, void 0, function* () {
        return inquirer.prompt([
            {
                type: "autocomplete",
                name: "task",
                message: "What are you going to do?",
                source: autocomplete_1.autocompleteTask,
            },
            {
                type: "autocomplete",
                name: "duration",
                message: "How long will it take?",
                source: autocomplete_1.autocompleteDuration,
                filter: utils_1.parseDuration,
            },
        ]);
    });
}
exports.getIWillOptionsInteractive = getIWillOptionsInteractive;
function iWill(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const start = luxon_1.DateTime.local();
        let startTime = start.toString();
        let tz = start.zoneName;
        utils_1.executeAfterStopwatch(() => {
            let duration = ~~((luxon_1.DateTime.local() - start) / 1000);
            let entry = { task: opts.task, datetime: startTime, tz, duration };
            console.log(entry);
            CarpeDiemData.addLogEntry(entry);
        }, opts.duration);
        //let duration = ~~((DateTime.local() - start) / 1000);
        //return { task: opts.task, datetime: startTime, tz, duration };
    });
}
exports.iWill = iWill;
