"use strict";
// @ts-nocheck
//#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var yargs = require("yargs");
var iDid_1 = require("./cli/iDid");
var iWill_1 = require("./cli/iWill");
var utils_1 = require("./utils");
var chrono = require("chrono-node");
yargs
    .usage("Usage: i <command> [options]")
    .epilogue("for more information, find our manual at http://github.com/tianyishi2001/carpe-diem/")
    //.describe("A handy task recorder for people who don't make plans but do care about their efficiency.")
    .command({
    command: "will [query..]",
    aliases: ["w"],
    builder: function (yargs) {
        return yargs
            .positional("query []", { describe: "Description of your task in natural language", array: true })
            .option("interactive", { alias: "i", describe: "Interactive Mode (default)", type: "boolean" })
            .option("task", { array: true, alias: ["do", "d"], describe: "The task to to" })
            .option("duration", { alias: ["for", "t"], describe: "Expected duration of your task", array: true });
    },
    handler: function (argv) { return __awaiter(void 0, void 0, void 0, function () {
        var parsed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!argv.query && !argv.task)
                        argv.interactive = true;
                    if (!argv.interactive) return [3 /*break*/, 2];
                    return [4 /*yield*/, iWill_1.getIWillOptionsInteractive()];
                case 1:
                    parsed = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    parsed = { task: argv.task, duration: argv.duration ? utils_1.parseDuration(argv.duration.join(" ")) : undefined };
                    _a.label = 3;
                case 3: return [4 /*yield*/, iWill_1.iWill(parsed)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }
})
    .command({
    command: "did [query..]",
    aliases: ["d"],
    builder: function (yargs) {
        return yargs
            .positional("query []", {
            describe: "Description of your task in natural language",
            array: true
        })
            .option("interactive", {
            alias: "i",
            describe: "Interactive Mode (default)",
            type: "boolean"
        })
            .option("task", {
            alias: ["do", "d"],
            describe: "The task to to",
            array: true,
            coerce: function (arr) { return arr.join(" "); }
        })
            .option("start", {
            alias: ["at", "T"],
            describe: "Datetime of your task",
            array: true,
            coerce: function (arr) { return chrono.parseDate(arr.join(" ")); }
        })
            .option("duration", {
            alias: ["for", "t"],
            describe: "Expected duration of your task",
            array: true,
            coerce: function (arr) { return utils_1.parseDuration(arr.join(" ")); }
        });
    },
    handler: function (argv) { return __awaiter(void 0, void 0, void 0, function () {
        var parsed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!argv.query && !argv.task)
                        argv.interactive = true;
                    if (!argv.interactive) return [3 /*break*/, 2];
                    return [4 /*yield*/, iDid_1.getIDidOptionsInteractive()];
                case 1:
                    parsed = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    parsed = { task: argv.task, start: argv.start, duration: argv.duration };
                    _a.label = 3;
                case 3: return [4 /*yield*/, iDid_1.iDid(parsed)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }
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
