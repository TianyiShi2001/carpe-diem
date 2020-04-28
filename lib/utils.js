"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const juration = __importStar(require("juration"));
const _ = __importStar(require("lodash"));
const EventEmitter = require("events");
const keypress = require("keypress");
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.sleep = sleep;
function secondsToHHMM(seconds) {
    const hours = ~~(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = ~~(seconds / 60);
    let res = "";
    hours !== 0 && (res += hours.toString() + (hours === 1 ? " hour " : " hours "));
    minutes !== 0 && (res += minutes.toString() + (minutes === 1 ? " minute" : " minutes"));
    return res;
}
exports.secondsToHHMM = secondsToHHMM;
function secondsToHHMMSS(seconds) {
    let hours = ~~(seconds / 3600);
    seconds -= hours * 3600;
    let minutes = ~~(seconds / 60);
    seconds -= minutes * 60;
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds;
}
exports.secondsToHHMMSS = secondsToHHMMSS;
function parseDuration(durationString) {
    try {
        return juration.parse(durationString);
    }
    catch (e) {
        return undefined;
    }
}
exports.parseDuration = parseDuration;
class Stopwatch extends EventEmitter {
    constructor(countDown) {
        super();
        this.elapsed = 0;
        this.countDown = countDown;
    }
    print() {
        //process.stdout.write("\u001b[2K\u001b[0E");
        console.clear();
        if (this.countDown) {
            process.stdout.write(`Time Elapsed: ${secondsToHHMMSS(this.elapsed)} | Time remaining: ${secondsToHHMMSS(this.countDown)}`);
        }
        else {
            process.stdout.write(`Time Elapsed: ${secondsToHHMMSS(this.elapsed)}`);
        }
        process.stdout.write('   PRESS "q" to stop');
    }
}
function executeAfterStopwatch(countDown, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        let stopwatch = new Stopwatch(countDown);
        stopwatch.on("tick", function () {
            this.elapsed++;
            this.countDown--;
            this.e;
            this.print();
        });
        stopwatch.on("stop", function () {
            this.stopped = true;
        });
        function runStopwatch(stopwatch) {
            return __awaiter(this, void 0, void 0, function* () {
                for (;;) {
                    if (stopwatch.stopped)
                        break;
                    stopwatch.emit("tick");
                    yield sleep(1000);
                }
            });
        }
        runStopwatch(stopwatch);
        keypress(process.stdin);
        process.stdin.on("keypress", function (ch, key) {
            return __awaiter(this, void 0, void 0, function* () {
                if (key && key.name == "q") {
                    stopwatch.emit("stop");
                    yield callback();
                    process.stdin.pause();
                }
            });
        });
        process.stdin.setRawMode(true);
        process.stdin.resume();
    });
}
exports.executeAfterStopwatch = executeAfterStopwatch;
function uniqueSortByOccurence(arr) {
    return _.chain(arr).countBy().toPairs().sortBy(1).reverse().map(0).value();
}
exports.uniqueSortByOccurence = uniqueSortByOccurence;
