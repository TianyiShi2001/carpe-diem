import * as juration from "juration";
import * as _ from "lodash";
const EventEmitter = require("events");
const keypress = require("keypress");
import moment from "moment";
import * as momentDurationFormatSetup from "moment-duration-format";

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function secondsToHHMM(seconds) {
  return moment.duration(seconds, "seconds").format("hh [hours] mm [minutes]");
}

export function secondsToHHMMSS(seconds) {
  return moment.duration(seconds, "seconds").format("hh:mm:ss", { trim: false });
}

export function parseDuration(durationString): number | undefined {
  try {
    return juration.parse(durationString);
  } catch (e) {
    return undefined;
  }
}

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
    } else {
      process.stdout.write(`Time Elapsed: ${secondsToHHMMSS(this.elapsed)}`);
    }
    process.stdout.write('   PRESS "q" to stop');
  }
}

export async function executeAfterStopwatch(countDown, callback) {
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
  async function runStopwatch(stopwatch) {
    for (;;) {
      if (stopwatch.stopped) break;
      stopwatch.emit("tick");
      await sleep(1000);
    }
  }
  runStopwatch(stopwatch);
  keypress(process.stdin);
  process.stdin.on("keypress", async function (ch, key) {
    if (key && key.name == "q") {
      stopwatch.emit("stop");
      await callback();
      process.stdin.pause();
    }
  });
  process.stdin.setRawMode(true);
  process.stdin.resume();
}

export function arrayToSpaceSeparatedString(arr) {
  return;
}

export function uniqueSortByOccurence(arr) {
  return _.chain(arr).countBy().toPairs().sortBy(1).reverse().map(0).value();
}
