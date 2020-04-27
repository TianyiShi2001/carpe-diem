import inquirer from "./utils/inquirer";
import { sleep, secondsToHHMMSS, parseDuration, executeAfterStopwatch } from "./utils";
import { autocompleteTask, autocompleteDuration } from "./utils/autocomplete";
import * as _ from "lodash";
import { DateTime } from "luxon";
import { LogEntry } from "./common";
import * as CarpeDiemData from "./data";
import { inquirerAttrs } from "./common";

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
  let ans2 = await inquirerAttrs(ans1.task);
  return { ...ans1, attrs: ans2 };
}

export async function iWill(opts: IWillOptions) {
  const start = DateTime.local();
  let startTime = start.toString();
  let tz = start.zoneName;
  executeAfterStopwatch(() => {
    let duration = ~~((DateTime.local() - start) / 1000);
    let entry = { task: opts.task, datetime: startTime, tz, duration, attrs: opts.attrs };
    console.log(entry);
    CarpeDiemData.addLogEntry(entry);
  }, opts.duration);
  //let duration = ~~((DateTime.local() - start) / 1000);
  //return { task: opts.task, datetime: startTime, tz, duration };
}
