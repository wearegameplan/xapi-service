"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var JsonSyntaxError_1 = __importDefault(require("../errors/JsonSyntaxError"));
exports.default = (function (data, path) {
    try {
        return JSON.parse(data);
    }
    catch (err) {
        if (err instanceof SyntaxError) {
            throw new JsonSyntaxError_1.default(path);
        }
    }
});
