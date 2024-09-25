"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var IfMatch_1 = __importDefault(require("../../errors/IfMatch"));
var IfNoneMatch_1 = __importDefault(require("../../errors/IfNoneMatch"));
exports.default = (function (_a) {
    var profile = _a.profile, ifMatch = _a.ifMatch, ifNoneMatch = _a.ifNoneMatch;
    if (ifMatch !== undefined && profile.etag !== ifMatch) {
        throw new IfMatch_1.default();
    }
    if (ifNoneMatch !== undefined && ifNoneMatch === '*') {
        throw new IfNoneMatch_1.default();
    }
});
