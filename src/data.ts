const Configstore = require("configstore");
const data = new Configstore("carpe-diem");
import { LogEntry, TaskEntry, LocationEntry } from "./common";
import * as deepExtend from "deep-extend";

if (!data.get("log")) {
  data.set("log", []);
}
if (!data.get("locations")) {
  data.set("locations", {});
}
if (!data.get("tasks")) {
  data.set("tasks", {});
}

export function getLog() {
  return data.get("log");
}
export function getLocationDict() {
  return data.get("locations");
}
export function getTaskDict(): TaskEntry[] {
  return data.get("tasks");
}
export function addLogEntry(entry: LogEntry): void {
  data.set("log", getLog().concat(entry));

  if (Object.keys(getTaskDict()).indexOf(entry.task) === -1) {
    updateTasks({ name: entry.task });
  }
}

export function updateTasks(entry: TaskEntry): void {
  data.set("tasks", deepExtend(getTaskDict(), { [entry.name]: entry }));
}