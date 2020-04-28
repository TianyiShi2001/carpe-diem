import inquirer from "./utils/inquirer";
import * as data from "./data";
import { uniqueSortByOccurence } from "./utils";
import * as fuzzy from "fuzzy";

export interface LogEntry {
  task: string;
  datetime: string;
  tz: string;
  duration: number;
  notes?: string;
  attrs?: { [k: string]: any };
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

export async function inquirerAttrs(taskName) {
  let qs = [];
  for (const attrName of data.getTaskDict()[taskName]["attrs"] as string[]) {
    qs.push({
      type: "autocomplete",
      name: attrName,
      message: `${attrName}?`,
      source: autocompleteAttr(taskName, attrName),
    });
    console.log(attrName, qs);
  }
  if (qs.length === 0) return {};
  return inquirer.prompt(qs);
}

export async function inquirerAttrsBefore(taskName) {
  let qs = [];
  for (const attrName of data.getTaskDict()[taskName]["attrs"]["before"] as string[]) {
    qs.push({
      type: "autocomplete",
      name: attrName,
      message: `${attrName}?`,
      source: autocompleteAttr(taskName, attrName),
    });
    console.log(attrName, qs);
  }
  if (qs.length === 0) return {};
  return inquirer.prompt(qs);
}

export async function inquirerAttrsAfter(taskName) {
  let qs = [];
  for (const attrName of data.getTaskDict()[taskName]["attrs"]["after"] as string[]) {
    qs.push({
      type: "autocomplete",
      name: attrName,
      message: `${attrName}?`,
      source: autocompleteAttr(taskName, attrName),
    });
    console.log(attrName, qs);
  }
  if (qs.length === 0) return {};
  return inquirer.prompt(qs);
}
