import * as data from "./data";
import inquirer from "./utils/inquirer";
import { parseDuration } from "./utils";
import { autocompleteDate, autocompleteTask, getTaskAttrsAsString } from "./utils/autocomplete";
import * as _ from "lodash";
import * as chrono from "chrono-node";
import { DateTime } from "luxon";

interface TaskAttrs {
  before: string[];
  after: string[];
}

export interface TaskEntry {
  name: string;
  tags?: string[];
  efficiency?: number;
  attrs?: TaskAttrs;
}

export async function getTaskOptionsInteractive(taskName?): Promise<TaskEntry> {
  let ans = await inquirer.prompt([
    {
      type: "autocomplete",
      name: "name",
      message: "Name of task?",
      source: autocompleteTask,
      when: !taskName,
    },
    {
      type: "input",
      name: "attrs.before",
      message: "New task: Attributes to set before a task begins? e.g. 'chapter, start page'",
      default: (answers) => getTaskAttrsAsString(answers.name || taskName),
      filter: (input: string) => input.split(/,\s*/g),
    },
    {
      type: "input",
      name: "attrs.after",
      message: "New Task: Attributes to set after a task finishes? e.g. 'end page'",
      default: (answers) => getTaskAttrsAsString(answers.name || taskName),
      filter: (input: string) => input.split(/,\s*/g),
    },
    {
      type: "input",
      name: "efficiency",
      message: "Efficiency of the task? Enter a number between -5 to 5.",
      validate: (input) => (+input && -5 <= +input && +input <= 5 ? true : "Enter a number between -5 and 5."),
    },
  ]);
  return { ...{ name: taskName }, ...ans };
}

export async function updateTasksInteractive(taskName?): Promise<void> {
  const taskEntry = await getTaskOptionsInteractive(taskName);
  data.updateTasks(taskEntry);
}

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
