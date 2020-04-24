"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Configstore = require("configstore");
const data = new Configstore("carpe-diem");
const deepExtend = require("deep-extend");
if (!data.get("log")) {
    data.set("log", []);
}
if (!data.get("locations")) {
    data.set("locations", {});
}
if (!data.get("tasks")) {
    data.set("tasks", {});
}
function getLog() {
    return data.get("log");
}
exports.getLog = getLog;
function getLocationDict() {
    return data.get("locations");
}
exports.getLocationDict = getLocationDict;
function getTaskDict() {
    return data.get("tasks");
}
exports.getTaskDict = getTaskDict;
function addLogEntry(entry) {
    data.set("log", getLog().concat(entry));
    if (Object.keys(getTaskDict()).indexOf(entry.task) === -1) {
        updateTasks({ name: entry.task });
    }
}
exports.addLogEntry = addLogEntry;
function updateTasks(entry) {
    data.set("tasks", deepExtend(getTaskDict(), { [entry.name]: entry }));
}
exports.updateTasks = updateTasks;
