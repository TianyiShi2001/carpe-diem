"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("./utils/inquirer");
const data = require("./data");
const utils_1 = require("./utils");
const fuzzy = require("fuzzy");
function autocompleteAttr(taskName, attrName) {
    let attrVals = data
        .getLog()
        .filter((e) => e.task === taskName)
        .reduce((res, curr) => {
        curr["attrs"] && curr["attrs"][attrName] && res.push(curr["attrs"][attrName]);
        return res;
    }, []);
    attrVals = utils_1.uniqueSortByOccurence(attrVals);
    return (answers, input) => __awaiter(this, void 0, void 0, function* () {
        input = input || "";
        let fuzzyResult = fuzzy.filter(input, attrVals);
        let res = fuzzyResult.map((el) => el.original);
        return res.length !== 0 ? res : [input];
    });
}
function inquirerAttrs(taskName) {
    return __awaiter(this, void 0, void 0, function* () {
        let qs = [];
        for (const attrName of data.getTaskDict()[taskName]["attrs"].before.concat(data.getTaskDict()[taskName]["attrs"].after)) {
            qs.push({
                type: "autocomplete",
                name: attrName,
                message: `${attrName}?`,
                source: autocompleteAttr(taskName, attrName),
            });
            console.log(attrName, qs);
        }
        if (qs.length === 0)
            return {};
        return inquirer_1.default.prompt(qs);
    });
}
exports.inquirerAttrs = inquirerAttrs;
function inquirerAttrsBefore(taskName) {
    return __awaiter(this, void 0, void 0, function* () {
        let qs = [];
        for (const attrName of data.getTaskDict()[taskName]["attrs"]["before"]) {
            qs.push({
                type: "autocomplete",
                name: attrName,
                message: `${attrName}?`,
                source: autocompleteAttr(taskName, attrName),
            });
            console.log(attrName, qs);
        }
        if (qs.length === 0)
            return {};
        return inquirer_1.default.prompt(qs);
    });
}
exports.inquirerAttrsBefore = inquirerAttrsBefore;
function inquirerAttrsAfter(taskName) {
    return __awaiter(this, void 0, void 0, function* () {
        let qs = [];
        for (const attrName of data.getTaskDict()[taskName]["attrs"]["after"]) {
            qs.push({
                type: "autocomplete",
                name: attrName,
                message: `${attrName}?`,
                source: autocompleteAttr(taskName, attrName),
            });
            console.log(attrName, qs);
        }
        if (qs.length === 0)
            return {};
        return inquirer_1.default.prompt(qs);
    });
}
exports.inquirerAttrsAfter = inquirerAttrsAfter;
