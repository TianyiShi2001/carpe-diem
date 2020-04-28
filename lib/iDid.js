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
const inquirer_1 = require("./utils/inquirer");
const utils_1 = require("./utils");
const autocomplete_1 = require("./utils/autocomplete");
const chrono = require("chrono-node");
const luxon_1 = require("luxon");
const common_1 = require("./common");
const task = require("./task");
const data = require("./data");
function getIDidOptionsInteractive() {
    return __awaiter(this, void 0, void 0, function* () {
        let ans1 = yield inquirer_1.default.prompt([
            {
                type: "autocomplete",
                name: "task",
                message: "What did you do?",
                source: autocomplete_1.autocompleteTask,
            },
            {
                type: "autocomplete",
                name: "start",
                message: "When did it start?",
                source: autocomplete_1.autocompleteDate,
                filter: chrono.parseDate,
            },
            {
                type: "autocomplete",
                name: "duration",
                message: "How long did it take?",
                source: autocomplete_1.autocompleteDuration,
                filter: utils_1.parseDuration,
            },
        ]);
        if (!data.getTaskEntry(ans1.task)) {
            yield task.updateTasksInteractive(ans1.task);
        }
        let ans2 = yield common_1.inquirerAttrs(ans1.task);
        return Object.assign(Object.assign({}, ans1), { attrs: ans2 });
    });
}
exports.getIDidOptionsInteractive = getIDidOptionsInteractive;
function iDidOptionsNatualLanguageParser(query) {
    return 1;
}
exports.iDidOptionsNatualLanguageParser = iDidOptionsNatualLanguageParser;
function iDid(opts) {
    return {
        task: opts.task,
        datetime: luxon_1.DateTime.fromJSDate(opts.start).toString(),
        tz: luxon_1.DateTime.local().zoneName,
        duration: opts.duration,
        attrs: opts.attrs,
    };
}
exports.iDid = iDid;
