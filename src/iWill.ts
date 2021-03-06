import inquirer from "./utils/inquirer";
import { parseDuration, executeAfterStopwatch } from "./utils";
import { autocompleteTask, autocompleteDuration } from "./utils/autocomplete";
import * as _ from "lodash";
import { DateTime } from "luxon";
import * as data from "./data";
import { inquirerAttrsAfter, inquirerAttrsBefore, inquirerEfficiency } from "./common";
import * as task from "./task";

interface IWillOptions {
  task: string;
  duration?: number;
  attrs?: { [k: string]: any };
}

export async function getIWillOptionsInteractive(): Promise<IWillOptions> {
  let ans1 = await inquirer.prompt([
    {
      type: "autocomplete",
      name: "task",
      message: "What are you going to do?",
      source: autocompleteTask,
    },
    {
      type: "autocomplete",
      name: "duration",
      message: "How long will it take?",
      source: autocompleteDuration,
      filter: parseDuration,
    },
  ]);
  if (!data.getTaskEntry(ans1.task)) {
    console.log(`You haven't done this task before. Now initializing "${ans1.task}"`);
    await task.updateTasksInteractive(ans1.task);
  }
  let attrsBefore = await inquirerAttrsBefore(ans1.task);
  return { ...ans1, attrs: attrsBefore };
}

export async function iWill(opts: IWillOptions) {
  const start = DateTime.local();
  let startTime = start.toString();
  let tz = start.zoneName;
  executeAfterStopwatch(opts.duration, async () => {
    let duration = ~~((DateTime.local() - start) / 1000);
    let attrsAfter = await inquirerAttrsAfter(opts.task);
    let efficiency = await inquirerEfficiency(opts.task);
    opts.attrs = { ...opts.attrs, ...attrsAfter };
    let entry = { task: opts.task, datetime: startTime, tz, duration, attrs: opts.attrs, efficiency };
    console.log(entry);
    data.addLogEntry(entry);
  });
  //let duration = ~~((DateTime.local() - start) / 1000);
  //return { task: opts.task, datetime: startTime, tz, duration };
}
