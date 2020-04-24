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
var inquirer = require("inquirer");
var utils_1 = require("../utils");
var autocomplete_1 = require("./autocomplete");
inquirer.registerPrompt("autocomplete", require("inquirer-autocomplete-prompt"));
function getIWillOptionsInteractive() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, inquirer.prompt([
                    {
                        type: "autocomplete",
                        name: "task",
                        message: "What are you going to do?",
                        source: autocomplete_1.autocompleteTask
                    },
                    {
                        type: "autocomplete",
                        name: "duration",
                        message: "How long will it take?",
                        source: autocomplete_1.autocompleteDuration,
                        filter: utils_1.parseDuration
                    },
                ])];
        });
    });
}
exports.getIWillOptionsInteractive = getIWillOptionsInteractive;
function iWill(config) {
    return __awaiter(this, void 0, void 0, function () {
        var startTime, endTime;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(config);
                    startTime = new Date();
                    return [4 /*yield*/, timer(config.duration)];
                case 1:
                    _a.sent();
                    endTime = new Date();
                    return [2 /*return*/];
            }
        });
    });
}
exports.iWill = iWill;
function timer(countDown) {
    return __awaiter(this, void 0, void 0, function () {
        var elapsed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    elapsed = 0;
                    if (!countDown) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    process.stdout.write("\u001b[2K\u001b[0E");
                    process.stdout.write("Time Elapsed: " + utils_1.secondsToHHMMSS(elapsed) + " | Time remaining: " + utils_1.secondsToHHMMSS(countDown));
                    return [4 /*yield*/, utils_1.sleep(1000)];
                case 2:
                    _a.sent();
                    elapsed++;
                    countDown--;
                    _a.label = 3;
                case 3: return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 8];
                case 5:
                    process.stdout.write("\u001b[2K\u001b[0E");
                    process.stdout.write("Time Elapsed: " + utils_1.secondsToHHMMSS(elapsed));
                    return [4 /*yield*/, utils_1.sleep(1000)];
                case 6:
                    _a.sent();
                    elapsed++;
                    _a.label = 7;
                case 7: return [3 /*break*/, 5];
                case 8: return [2 /*return*/];
            }
        });
    });
}
