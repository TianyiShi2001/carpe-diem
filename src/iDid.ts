import inquirer from "./utils/inquirer";
import { parseDuration } from "./utils";
import { autocompleteDate, autocompleteTask, autocompleteDuration } from "./utils/autocomplete";
import * as _ from "lodash";
import * as chrono from "chrono-node";
import { DateTime } from "luxon";
import { LogEntry, inquirerAttrs, inquirerEfficiency, Efficiency, Attrs } from "./common";
import * as task from "./task";
import * as data from "./data";

interface IDidOptions {
  task: string;
  start: Date;
  duration: number;
  attrs?: Attrs;
  efficiency: Efficiency;
}

export async function getIDidOptionsInteractive(): Promise<IDidOptions> {
  let ans1 = await inquirer.prompt([
    {
      type: "autocomplete",
      name: "task",
      message: "What did you do?",
      source: autocompleteTask,
    },
    {
      type: "autocomplete",
      name: "start",
      message: "When did it start?",
      source: autocompleteDate,
      filter: chrono.parseDate,
    },
    {
      type: "autocomplete",
      name: "duration",
      message: "How long did it take?",
      source: autocompleteDuration,
      filter: parseDuration,
    },
  ]);
  if (!data.getTaskEntry(ans1.task)) {
    console.log(`You haven't done this task before. Now initializing "${ans1.task}"`);
    await task.updateTasksInteractive(ans1.task);
  }
  let attrs = await inquirerAttrs(ans1.task);
  let efficiency = await inquirerEfficiency(ans1.task);
  return { ...ans1, attrs, efficiency };
}

export function iDidOptionsNatualLanguageParser(query) {
  return 1;
}

export function iDid(opts: IDidOptions): LogEntry {
  return {
    task: opts.task,
    datetime: DateTime.fromJSDate(opts.start).toString(),
    tz: DateTime.local().zoneName,
    duration: opts.duration,
    attrs: opts.attrs,
  };
}
