// const Configstore = require("configstore");
// const data = new Configstore("carpe-diem");
const log = require("data-store")(".carpe-diem-log");
const meta = require("data-store")(".carpe-diem-meta");
import { LogEntry, LocationEntry } from "./common";
import { TaskEntry } from "./task";

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

export function getLog(): LogEntry[] {
  return log.get("log");
}
export function addLogEntry(entry: LogEntry): void {
  log.set("log", getLog().concat(entry));
}
export function getLocationDict() {
  return meta.get("locations");
}
export function getTaskDict() {
  return meta.get("tasks");
}
export function getTaskEntry(q): TaskEntry {
  return meta.get("tasks")[q];
}

export function updateTasks(entry: TaskEntry): void {
  updateTags(entry.name, entry.tags);
  meta.set(`tasks.${entry.name}`, entry);
}

export function showPath(): string {
  return `${log.path}\n${meta.path}`;
}

export function updateTags(taskName, tags: string[]): void {
  const oldTags = meta.get(`tasks.${taskName}.tags`) || [];
  for (const tag of tags) {
    if (oldTags.indexOf(tag) === -1) meta.set(`tags.${tag}`, (meta.get(`tags.${tag}`) || []).concat(taskName));
  }
  for (const oldTag of oldTags) {
    if (tags.indexOf(oldTag) === -1) {
      meta.set(
        `tags.${oldTag}`,
        meta.get(`tags.${oldTag}`).filter((e) => e !== taskName)
      );
    }
  }
}
