"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var memoryRepo_1 = __importDefault(require("jscommons/dist/memoryRepo"));
var deleteState_1 = __importDefault(require("./deleteState"));
var deleteStates_1 = __importDefault(require("./deleteStates"));
var getState_1 = __importDefault(require("./getState"));
var getStates_1 = __importDefault(require("./getStates"));
var overwriteState_1 = __importDefault(require("./overwriteState"));
var patchState_1 = __importDefault(require("./patchState"));
exports.default = (function (config) {
    return __assign({ deleteState: deleteState_1.default(config), deleteStates: deleteStates_1.default(config), getState: getState_1.default(config), getStates: getStates_1.default(config), overwriteState: overwriteState_1.default(config), patchState: patchState_1.default(config) }, memoryRepo_1.default(config));
});
