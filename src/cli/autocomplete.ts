import { secondsToHHMM, parseDuration } from "../utils";
import * as fuzzy from "fuzzy";
import * as chrono from "chrono-node";

// ordered by occurence
function getTasks(): string[] {
  return ["foo", "bar"];
}

export async function autocompleteTask(answers, input) {
  input = input || "";
  let fuzzyResult = fuzzy.filter(input, getTasks());
  let res = fuzzyResult.map((el) => el.original);
  return res.length !== 0 ? res : [input];
}

export async function autocompleteDate(answers, input) {
  if (!input) return ["e.g. 'yesterday 4pm', '2 days ago 14:30', 'last Monday 11:20'"];
  let res = chrono.parseDate(input);
  return res ? [res.toString()] : ["e.g. 'yesterday 4pm', '2 days ago 14:30', 'last Monday 11:20'"];
}

export async function autocompleteDuration(answers, input) {
  if (!input) return ["skip", "1 Hour", "30 Minutes", "25 Minutes", "10 Minutes"];
  if (+input) return input < 4 ? [input + " Hours"] : [input + " Minutes"];
  let parseResult = parseDuration(input);
  return parseResult ? [secondsToHHMM(parseResult)] : ["Example input: '2h30m', '2hrs 20min', '4 hrs 10min'"];
}
