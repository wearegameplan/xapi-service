"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MaxEtags_1 = __importDefault(require("../../errors/MaxEtags"));
exports.default = (function (ifMatch, ifNoneMatch) {
    if (ifMatch !== undefined && ifNoneMatch !== undefined) {
        throw new MaxEtags_1.default();
    }
});
