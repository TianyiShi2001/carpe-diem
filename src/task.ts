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
      message: "Attributes to be specified before a task begins?",
      default: (answers) => getTaskAttrsAsString(answers.name || taskName),
      filter: (input: string) => input.split(/,\s*/g),
    },
    {
      type: "input",
      name: "attrs.after",
      message: "Attributes to be specified after a task finishes?",
      default: (answers) => getTaskAttrsAsString(answers.name || taskName),
      filter: (input: string) => input.split(/,\s*/g),
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
