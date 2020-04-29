import * as data from "./data";
import inquirer from "./utils/inquirer";
import { autocompleteTask } from "./utils/autocomplete";
import * as _ from "lodash";

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
      message: "Attributes to set before a task begins? e.g. 'chapter, start page'",
      default: (answers) => getTaskAttrsBeforeAsString(answers.name || taskName),
      filter: (input: string) => (input ? input.split(/,\s*/g) : []),
    },
    {
      type: "input",
      name: "attrs.after",
      message: "Attributes to set after a task finishes? e.g. 'end page'",
      default: (answers) => getTaskAttrsAfterAsString(answers.name || taskName),
      filter: (input: string) => (input ? input.split(/,\s*/g) : []),
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
      filter: (input: string) => (input ? input.split(/,\s*/g) : []),
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

function getTaskAttrsBeforeAsString(taskName: string): string {
  let task = data.getTaskEntry(taskName);
  return task && task["attrs"] ? task["attrs"]["before"].join(", ") : "";
}

function getTaskAttrsAfterAsString(taskName: string): string {
  let task = data.getTaskEntry(taskName);
  return task && task["attrs"] ? task["attrs"]["after"].join(", ") : "";
}

function getTaskTagsAsString(taskName: string): string {
  let task = data.getTaskEntry(taskName);
  return task && task["tags"] ? task["tags"].join(", ") : "";
}
