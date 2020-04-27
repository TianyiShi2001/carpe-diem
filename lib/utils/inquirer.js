"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
inquirer.registerPrompt("autocomplete", require("inquirer-autocomplete-prompt"));
exports.default = inquirer;
