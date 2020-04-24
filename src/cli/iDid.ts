import * as inquirer from "inquirer";
import { parseDuration } from "../utils";
import { autocompleteDate, autocompleteTask, autocompleteDuration } from "./autocomplete";
import * as _ from "lodash";
import * as chrono from "chrono-node";
import { DateTime } from "luxon";
import { TaskEntry } from "../common";

inquirer.registerPrompt("autocomplete", require("inquirer-autocomplete-prompt"));

interface IDidOptions {
  task: string;
  start: Date;
  duration: number;
  tz?: string;
}

export async function getIDidOptionsInteractive(): Promise<IDidOptions> {
  return inquirer.prompt([
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
}

export function iDidOptionsNatualLanguageParser(query) {
  return 1;
}

export function iDid(opts: IDidOptions): TaskEntry {
  return {
    task: opts.task,
    datetime: DateTime.fromJSDate(opts.start).toString(),
    tz: DateTime.local().zoneName,
    duration: opts.duration,
  };
}
