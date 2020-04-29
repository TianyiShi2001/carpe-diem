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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data = __importStar(require("./data"));
const inquirer_1 = __importDefault(require("./utils/inquirer"));
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
                message: "Attributes to set before a task begins? e.g. 'chapter, start page'",
                default: (answers) => getTaskAttrsBeforeAsString(answers.name || taskName),
                filter: (input) => (input ? input.split(/,\s*/g) : []),
            },
            {
                type: "input",
                name: "attrs.after",
                message: "Attributes to set after a task finishes? e.g. 'end page'",
                default: (answers) => getTaskAttrsAfterAsString(answers.name || taskName),
                filter: (input) => (input ? input.split(/,\s*/g) : []),
            },
            {
                type: "input",
                name: "efficiency",
                message: "Productivity of the task? Enter a number between -5 to 5.",
                validate: (input) => (+input && -5 <= +input && +input <= 5 ? true : "Enter a number between -5 and 5. -5 means very unproductive; 5 means very productive."),
            },
            {
                type: "input",
                name: "tags",
                message: "What tags would you add to this task?",
                default: (answers) => getTaskTagsAsString(answers.name || taskName),
                filter: (input) => (input ? input.split(/,\s*/g) : []),
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
function getTaskAttrsBeforeAsString(taskName) {
    let task = data.getTaskEntry(taskName);
    return task && task["attrs"] ? task["attrs"]["before"].join(", ") : "";
}
function getTaskAttrsAfterAsString(taskName) {
    let task = data.getTaskEntry(taskName);
    return task && task["attrs"] ? task["attrs"]["after"].join(", ") : "";
}
function getTaskTagsAsString(taskName) {
    let task = data.getTaskEntry(taskName);
    return task && task["tags"] ? task["tags"].join(", ") : "";
}
