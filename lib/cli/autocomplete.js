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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var utils_1 = require("../utils");
var fuzzy = require("fuzzy");
var chrono = require("chrono-node");
// ordered by occurence
function getTasks() {
    return ["foo", "bar"];
}
function autocompleteTask(answers, input) {
    return __awaiter(this, void 0, void 0, function () {
        var fuzzyResult, res;
        return __generator(this, function (_a) {
            input = input || "";
            fuzzyResult = fuzzy.filter(input, getTasks());
            res = fuzzyResult.map(function (el) { return el.original; });
            return [2 /*return*/, res.length !== 0 ? res : [input]];
        });
    });
}
exports.autocompleteTask = autocompleteTask;
function autocompleteDate(answers, input) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            if (!input)
                return [2 /*return*/, ["e.g. 'yesterday 4pm', '2 days ago 14:30', 'last Monday 11:20'"]];
            res = chrono.parseDate(input);
            return [2 /*return*/, res ? [res.toString()] : ["e.g. 'yesterday 4pm', '2 days ago 14:30', 'last Monday 11:20'"]];
        });
    });
}
exports.autocompleteDate = autocompleteDate;
function autocompleteDuration(answers, input) {
    return __awaiter(this, void 0, void 0, function () {
        var parseResult;
        return __generator(this, function (_a) {
            if (!input)
                return [2 /*return*/, ["skip", "1 Hour", "30 Minutes", "25 Minutes", "10 Minutes"]];
            if (+input)
                return [2 /*return*/, input < 4 ? [input + " Hours"] : [input + " Minutes"]];
            parseResult = utils_1.parseDuration(input);
            return [2 /*return*/, parseResult ? [utils_1.secondsToHHMM(parseResult)] : ["Example input: '2h30m', '2hrs 20min', '4 hrs 10min'"]];
        });
    });
}
exports.autocompleteDuration = autocompleteDuration;
