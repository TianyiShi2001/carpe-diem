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
const data = require("./data");
const inquirer_1 = require("./utils/inquirer");
const autocomplete_1 = require("./utils/autocomplete");
function getTaskOptionsInteractive(taskName) {
    return __awaiter(this, void 0, void 0, function* () {
        let ans = yield inquirer_1.default.prompt([
            {
                type: "autocomplete",
                name: "name",
                message: "Name of task?",
                source: autocomplete_1.autocompleteTask,
                when: !taskName,
            },
            {
                type: "input",
                name: "attrs.before",
                message: "Attributes to be specified before a task begins?",
                default: (answers) => autocomplete_1.getTaskAttrsAsString(answers.name || taskName),
                filter: (input) => input.split(/,\s*/g),
            },
            {
                type: "input",
                name: "attrs.after",
                message: "Attributes to be specified after a task finishes?",
                default: (answers) => autocomplete_1.getTaskAttrsAsString(answers.name || taskName),
                filter: (input) => input.split(/,\s*/g),
            },
        ]);
        return Object.assign({ name: taskName }, ans);
    });
}
exports.getTaskOptionsInteractive = getTaskOptionsInteractive;
function updateTasksInteractive(taskName) {
    return __awaiter(this, void 0, void 0, function* () {
        const taskEntry = yield getTaskOptionsInteractive(taskName);
        data.updateTasks(taskEntry);
    });
}
exports.updateTasksInteractive = updateTasksInteractive;
// export async function getTaskOptionsInteractive(): Promise<TaskEntry> {
//   let ans1 = await inquirer.prompt([
//     {
//       type: "autocomplete",
//       name: "name",
//       message: "Name of task?",
//       source: autocompleteTask,
//     },
//   ]);
//   let ans2 = await inquirer.prompt([
//     {
//       type: "input",
//       name: "attributes",
//       message: "Attributes?",
//       default: getTaskAttrsAsString(ans1.name),
//       filter: (input: string) => input.split(/,\s+?/g),
//     },
//   ]);
//   return { ...ans1, ...ans2 };
// }
