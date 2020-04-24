"use strict";
exports.__esModule = true;
var juration = require("juration");
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.sleep = sleep;
function secondsToHHMM(seconds) {
    var hours = ~~(seconds / 3600);
    seconds -= hours * 3600;
    var minutes = ~~(seconds / 60);
    var res = "";
    hours !== 0 && (res += hours.toString() + (hours === 1 ? " hour " : " hours "));
    minutes !== 0 && (res += minutes.toString() + (minutes === 1 ? " minute" : " minutes"));
    return res;
}
exports.secondsToHHMM = secondsToHHMM;
function secondsToHHMMSS(seconds) {
    var hours = ~~(seconds / 3600);
    seconds -= hours * 3600;
    var minutes = ~~(seconds / 60);
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
