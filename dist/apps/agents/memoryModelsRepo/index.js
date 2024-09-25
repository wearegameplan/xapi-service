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
var deleteProfile_1 = __importDefault(require("./deleteProfile"));
var getProfile_1 = __importDefault(require("./getProfile"));
var getProfiles_1 = __importDefault(require("./getProfiles"));
var hasProfile_1 = __importDefault(require("./hasProfile"));
var overwriteProfile_1 = __importDefault(require("./overwriteProfile"));
var patchProfile_1 = __importDefault(require("./patchProfile"));
exports.default = (function (config) {
    return __assign({ deleteProfile: deleteProfile_1.default(config), getProfile: getProfile_1.default(config), getProfiles: getProfiles_1.default(config), hasProfile: hasProfile_1.default(config), overwriteProfile: overwriteProfile_1.default(config), patchProfile: patchProfile_1.default(config) }, memoryRepo_1.default(config));
});
