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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("./utils/inquirer"));
const data = __importStar(require("./data"));
const utils_1 = require("./utils");
const fuzzy = __importStar(require("fuzzy"));
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
function inquirerEfficiency(taskName) {
    return __awaiter(this, void 0, void 0, function* () {
        const baseEfficiency = data.getTaskEntry(taskName).efficiency;
        if (baseEfficiency <= 0)
            return baseEfficiency;
        let ans = yield inquirer_1.default.prompt([
            {
                type: "input",
                name: "rating",
                message: `How would you rate your efficiency? Enter a number between 0 and 5.`,
                default: 5,
                validate: (input) => (+input && 0 <= +input && +input <= 5 ? true : "Enter a number between 0 and 5."),
            },
        ]);
        return [baseEfficiency, ans.rating, (baseEfficiency * ans.rating) / 5];
    });
}
exports.inquirerEfficiency = inquirerEfficiency;
