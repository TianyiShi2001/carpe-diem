import * as data from "./data";
import inquirer from "./utils/inquirer";
import { parseDuration } from "./utils";
import { autocompleteDate, autocompleteTask, getTaskAttrsAsString } from "./utils/autocomplete";
import * as _ from "lodash";
import * as chrono from "chrono-node";
import { DateTime } from "luxon";

export interface TaskEntry {
  name: string;
  tags?: string[];
  efficiency?: number;
  attrs?: { [k: string]: any };
}

export async function getTaskOptionsInteractive(): Promise<TaskEntry> {
  return inquirer.prompt([
    {
      type: "autocomplete",
      name: "name",
      message: "Name of task?",
      source: autocompleteTask,
    },
    {
      type: "input",
      name: "attrs",
      message: "Attributes?",
      default: (answers) => getTaskAttrsAsString(answers.name),
      filter: (input: string) => input.split(/,\s+?/g),
    },
  ]);
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
