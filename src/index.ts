// @ts-nocheck
//#!/usr/bin/env node

import * as yargs from "yargs";
import { getIDidOptionsInteractive, iDid } from "./cli/iDid";
import { getIWillOptionsInteractive, iWill } from "./cli/iWill";
import { parseDuration } from "./utils";
import * as chrono from "chrono-node";

yargs
  .usage("Usage: i <command> [options]")
  .epilogue("for more information, find our manual at http://github.com/tianyishi2001/carpe-diem/")
  //.describe("A handy task recorder for people who don't make plans but do care about their efficiency.")
  .command({
    command: "will [query..]",
    aliases: ["w"],
    builder: (yargs) =>
      yargs
        .positional("query []", { describe: "Description of your task in natural language", array: true })
        .option("interactive", { alias: "i", describe: "Interactive Mode (default)", type: "boolean" })
        .option("task", { array: true, alias: ["do", "d"], describe: "The task to to" })
        .option("duration", { alias: ["for", "t"], describe: "Expected duration of your task", array: true }),
    handler: async (argv) => {
      if (!argv.query && !argv.task) argv.interactive = true;
      let parsed;
      if (argv.interactive) {
        parsed = await getIWillOptionsInteractive();
      } else {
        parsed = { task: argv.task, duration: argv.duration ? parseDuration(argv.duration.join(" ")) : undefined };
      }
      await iWill(parsed);
    },
  })
  .command({
    command: "did [query..]",
    aliases: ["d"],
    builder: (yargs) =>
      yargs
        .positional("query []", {
          describe: "Description of your task in natural language",
          array: true,
        })
        .option("interactive", {
          alias: "i",
          describe: "Interactive Mode (default)",
          type: "boolean",
        })
        .option("task", {
          alias: ["do", "d"],
          describe: "The task to to",
          array: true,
          coerce: (arr) => arr.join(" "),
        })
        .option("start", {
          alias: ["at", "T"],
          describe: "Datetime of your task",
          array: true,
          coerce: (arr) => chrono.parseDate(arr.join(" ")),
        })
        .option("duration", {
          alias: ["for", "t"],
          describe: "Expected duration of your task",
          array: true,
          coerce: (arr) => parseDuration(arr.join(" ")),
        }),
    handler: async (argv) => {
      if (!argv.query && !argv.task) argv.interactive = true;
      let parsed;
      if (argv.interactive) {
        parsed = await getIDidOptionsInteractive();
      } else {
        parsed = { task: argv.task, start: argv.start, duration: argv.duration };
      }
      await iDid(parsed);
    },
  })
  .completion("completion", function (current, argv) {
    return ["will", "did"];
  })
  .demandCommand(1, 1, "Usage: \n   i will [query] (alias: i w [query])\n   i did [query] (alias: i d [query])")
  .help()
  .example("i will", "I will do something now (interactive mode)")
  .example("i did", "I did something (interactive mode)")
  .example("i will --do my task", 'Now I will do "my task" and start timing')
  .example("i will --do my task --for 4 hrs 30 min", 'Now I will do "my task" for 4 hours and half')
  .example("i will (do) my task for 4 hrs 30 min", 'Same as above, in natural language (the "do" word is optional) [NOT IMPLEMENTED YET]').argv;
