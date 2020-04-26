#!/usr/bin/env node

"use strict";
// @ts-nocheck
//#!/usr/bin/env node
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const iDid_1 = require("./cli/iDid");
const iWill_1 = require("./cli/iWill");
const utils_1 = require("./utils");
const chrono = require("chrono-node");
const CarpeDiemData = require("./data");
//console.clear();
//console.log(chalk.yellow(figlet.textSync("Carpe Diem", { horizontalLayout: "full" })));
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
    handler: (argv) =>
      __awaiter(void 0, void 0, void 0, function* () {
        if (!argv.query && !argv.task) argv.interactive = true;
        let parsed;
        if (argv.interactive) {
          parsed = yield iWill_1.getIWillOptionsInteractive();
        } else {
          parsed = { task: argv.task, duration: argv.duration ? utils_1.parseDuration(argv.duration.join(" ")) : undefined };
        }
        iWill_1.iWill(parsed);
      }),
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
          coerce: (arr) => utils_1.parseDuration(arr.join(" ")),
        }),
    handler: (argv) =>
      __awaiter(void 0, void 0, void 0, function* () {
        if (!argv.query && !argv.task) argv.interactive = true;
        let parsed;
        if (argv.interactive) {
          parsed = yield iDid_1.getIDidOptionsInteractive();
        } else {
          parsed = { task: argv.task, start: argv.start, duration: argv.duration };
        }
        let entry = yield iDid_1.iDid(parsed);
        console.log(entry);
        CarpeDiemData.addLogEntry(entry);
      }),
  })
  .command({
    command: "show <item>",
    aliases: "s",
    builder: (yargs) => yargs.positional("item", { describe: "log/tasks/locations/summary (currently only log implemented)" }),
    handler: (argv) => {
      switch (argv.item) {
        case "log":
          console.log(CarpeDiemData.getLog());
          break;
        case "tasks":
          console.log(CarpeDiemData.getTaskDict());
        default:
          console.log("not implemented yet");
          break;
      }
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