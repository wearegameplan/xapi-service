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
var mongodb_1 = require("mongodb");
var getAgentFilter_1 = __importDefault(require("./getAgentFilter"));
exports.default = (function (opts) {
    return __assign(__assign({}, getAgentFilter_1.default(opts.agent)), { lrs: new mongodb_1.ObjectID(opts.client.lrs_id), organisation: new mongodb_1.ObjectID(opts.client.organisation) });
});
