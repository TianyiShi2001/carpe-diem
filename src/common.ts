import inquirer from "./utils/inquirer";
import * as data from "./data";
import { uniqueSortByOccurence } from "./utils";
import * as fuzzy from "fuzzy";
export type Attrs = { [k: string]: any };
export type Efficiency = [number, number, number] | number;

export interface LogEntry {
  task: string;
  datetime: string;
  tz: string;
  duration: number;
  notes?: string;
  attrs?: Attrs;
  efficiency?: Efficiency;
}

export interface LocationEntry {
  name: string;
  coordinates: {
    long: number;
    lat: number;
  };
  address: string;
}

function autocompleteAttr(taskName, attrName) {
  let attrVals = data
    .getLog()
    .filter((e) => e.task === taskName)
    .reduce((res, curr) => {
      curr["attrs"] && curr["attrs"][attrName] && res.push(curr["attrs"][attrName]);
      return res;
    }, []);
  attrVals = uniqueSortByOccurence(attrVals);
  return async (answers, input) => {
    input = input || "";
    let fuzzyResult = fuzzy.filter(input, attrVals);
    let res = fuzzyResult.map((el) => el.original);
    return res.length !== 0 ? res : [input];
  };
}

export async function inquirerAttrs(taskName): Promise<Attrs> {
  let qs = [];
  for (const attrName of data.getTaskDict()[taskName]["attrs"].before.concat(data.getTaskDict()[taskName]["attrs"].after) as string[]) {
    qs.push({
      type: "autocomplete",
      name: attrName,
      message: `${attrName}?`,
      source: autocompleteAttr(taskName, attrName),
    });
  }
  if (qs.length === 0) return {};
  return inquirer.prompt(qs);
}

export async function inquirerAttrsBefore(taskName): Promise<Attrs> {
  let qs = [];
  for (const attrName of data.getTaskDict()[taskName]["attrs"]["before"] as string[]) {
    qs.push({
      type: "autocomplete",
      name: attrName,
      message: `${attrName}?`,
      source: autocompleteAttr(taskName, attrName),
    });
  }
  if (qs.length === 0) return {};
  return inquirer.prompt(qs);
}

export async function inquirerAttrsAfter(taskName): Promise<Attrs> {
  let qs = [];
  for (const attrName of data.getTaskDict()[taskName]["attrs"]["after"] as string[]) {
    qs.push({
      type: "autocomplete",
      name: attrName,
      message: `${attrName}?`,
      source: autocompleteAttr(taskName, attrName),
    });
  }
  if (qs.length === 0) return {};
  return inquirer.prompt(qs);
}

export async function inquirerEfficiency(taskName): Promise<Efficiency> {
  const baseEfficiency = data.getTaskEntry(taskName).efficiency;
  if (baseEfficiency <= 0) return baseEfficiency;
  let ans = await inquirer.prompt([
    {
      type: "input",
      name: "rating",
      message: `How would you rate your efficiency? Enter a number between 0 and 5.`,
      default: 5,
      validate: (input) => (+input && 0 <= +input && +input <= 5 ? true : "Enter a number between 0 and 5."),
    },
  ]);
  return [baseEfficiency, ans.rating, (baseEfficiency * ans.rating) / 5];
}
