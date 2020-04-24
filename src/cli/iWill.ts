import * as inquirer from "inquirer";
import { sleep, secondsToHHMMSS, parseDuration } from "../utils";
import { autocompleteTask, autocompleteDuration } from "./autocomplete";
import * as _ from "lodash";
import { DateTime } from "luxon";
import { TaskEntry } from "../common";

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

export async function iWill(opts: IWillOptions): Promise<TaskEntry> {
  const now = DateTime.local();
  let datetime = now.toString();
  let tz = now.zoneName;
  let duration = await timer(opts.duration);
  return { task: opts.task, datetime, tz, duration };
}

async function timer(countDown?): Promise<number> {
  let elapsed = 0;
  if (countDown) {
    for (;;) {
      process.stdout.write("\u001b[2K\u001b[0E");
      process.stdout.write(`Time Elapsed: ${secondsToHHMMSS(elapsed)} | Time remaining: ${secondsToHHMMSS(countDown)}`);
      await sleep(1000);
      elapsed++;
      countDown--;
    }
  } else {
    for (;;) {
      process.stdout.write("\u001b[2K\u001b[0E");
      process.stdout.write(`Time Elapsed: ${secondsToHHMMSS(elapsed)}`);
      await sleep(1000);
      elapsed++;
    }
  }
}
