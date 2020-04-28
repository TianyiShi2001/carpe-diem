// const Configstore = require("configstore");
// const data = new Configstore("carpe-diem");
const data = require("data-store")(".carpe-diem");
import { LogEntry, LocationEntry } from "./common";
import { TaskEntry } from "./task";

if (!data.get("log")) {
  data.set("log", []);
}
if (!data.get("locations")) {
  data.set("locations", {});
}
if (!data.get("tasks")) {
  data.set("tasks", {});
}

export function getLog(): LogEntry[] {
  return data.get("log");
}
export function getLocationDict() {
  return data.get("locations");
}
export function getTaskDict() {
  return data.get("tasks");
}
export function getTaskEntry(q): TaskEntry {
  return data.get("tasks")[q];
}
export function addLogEntry(entry: LogEntry): void {
  data.set("log", getLog().concat(entry));
}

export function updateTasks(entry: TaskEntry): void {
  data.set(`tasks.${entry.name}`, entry);
}
