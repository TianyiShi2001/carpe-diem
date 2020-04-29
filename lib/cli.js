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
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
  };
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = __importStar(require("yargs"));
const iDid_1 = require("./iDid");
const iWill_1 = require("./iWill");
const utils_1 = require("./utils");
const chrono = __importStar(require("chrono-node"));
const data = __importStar(require("./data"));
const task_1 = require("./task");
//console.clear();
//console.log(chalk.yellow(figlet.textSync("Carpe Diem", { horizontalLayout: "full" })));
const program = yargs
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
          alias: ["at", "T", "on"],
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
        data.addLogEntry(entry);
      }),
  })
  .command({
    command: "show <item>",
    aliases: "s",
    builder: (yargs) => yargs.positional("item", { describe: "log/tasks/locations/summary (currently only log implemented)" }),
    handler: (argv) => {
      switch (argv.item) {
        case "path":
          console.log(data.showPath());
          break;
        case "log":
          console.log(data.getLog());
          break;
        case "tasks":
          console.log(data.getTaskDict());
          break;
        default:
          console.log("not implemented yet");
          break;
      }
    },
  })
  .command({
    command: "edit <item>",
    alias: "e",
    builder: (yargs) => yargs.positional("item", { describe: "log/tasks/locations/summary (currently only tasks implemented)" }),
    handler: (argv) =>
      __awaiter(void 0, void 0, void 0, function* () {
        switch (argv.item) {
          case "tasks":
            let task = yield task_1.getTaskOptionsInteractive();
            data.updateTasks(task);
            break;
          default:
            console.log("not implemented yet");
            break;
        }
      }),
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
  .example("i will (do) my task for 4 hrs 30 min", 'Same as above, in natural language (the "do" word is optional) [NOT IMPLEMENTED YET]');
program.argv;
