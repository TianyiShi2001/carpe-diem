"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const Configstore = require("configstore");
// const data = new Configstore("carpe-diem");
const log = require("data-store")(".carpe-diem-log");
const meta = require("data-store")(".carpe-diem-meta");
if (!log.get("log")) {
    log.set("log", []);
}
if (!meta.get("locations")) {
    meta.set("locations", {});
}
if (!meta.get("tasks")) {
    meta.set("tasks", {});
}
if (!meta.get("tags")) {
    meta.set("tags", {});
}
function getLog() {
    return log.get("log");
}
exports.getLog = getLog;
function addLogEntry(entry) {
    log.set("log", getLog().concat(entry));
}
exports.addLogEntry = addLogEntry;
function getLocationDict() {
    return meta.get("locations");
}
exports.getLocationDict = getLocationDict;
function getTaskDict() {
    return meta.get("tasks");
}
exports.getTaskDict = getTaskDict;
function getTaskEntry(q) {
    return meta.get("tasks")[q];
}
exports.getTaskEntry = getTaskEntry;
function updateTasks(entry) {
    updateTags(entry.name, entry.tags);
    meta.set(`tasks.${entry.name}`, entry);
}
exports.updateTasks = updateTasks;
function showPath() {
    return `${log.path}\n${meta.path}`;
}
exports.showPath = showPath;
function updateTags(taskName, tags) {
    const oldTags = meta.get(`tasks.${taskName}.tags`) || [];
    for (const tag of tags) {
        if (oldTags.indexOf(tag) === -1)
            meta.set(`tags.${tag}`, (meta.get(`tags.${tag}`) || []).concat(taskName));
    }
    for (const oldTag of oldTags) {
        if (tags.indexOf(oldTag) === -1) {
            meta.set(`tags.${oldTag}`, meta.get(`tags.${oldTag}`).filter((e) => e !== taskName));
        }
    }
}
exports.updateTags = updateTags;
