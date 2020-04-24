import * as inquirer from "inquirer";
import { sleep, secondsToHHMMSS, parseDuration, executeAfterStopwatch } from "../utils";
import { autocompleteTask, autocompleteDuration } from "./autocomplete";
import * as _ from "lodash";
import { DateTime } from "luxon";
import { LogEntry } from "../common";
import * as CarpeDiemData from "../data";

inquirer.registerPrompt("autocomplete", require("inquirer-autocomplete-prompt"));

interface IWillOptions {
  task: string;
  duration?: number;
}

export async function getIWillOptionsInteractive(): Promise<IWillOptions> {
  return inquirer.prompt([
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
}

export async function iWill(opts: IWillOptions) {
  const start = DateTime.local();
  let startTime = start.toString();
  let tz = start.zoneName;
  executeAfterStopwatch(() => {
    let duration = ~~((DateTime.local() - start) / 1000);
    let entry = { task: opts.task, datetime: startTime, tz, duration };
    console.log(entry);
    CarpeDiemData.addLogEntry(entry);
  }, opts.duration);
  //let duration = ~~((DateTime.local() - start) / 1000);
  //return { task: opts.task, datetime: startTime, tz, duration };
}
