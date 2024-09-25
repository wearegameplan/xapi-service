"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isMatchingStates_1 = __importDefault(require("./isMatchingStates"));
exports.default = (function (state, opts) {
    return (state.stateId === opts.stateId &&
        isMatchingStates_1.default(state, opts));
});
