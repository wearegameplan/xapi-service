"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
exports.default = (function (opts) {
    return path_1.join.apply(void 0, __spreadArrays((opts.subfolder !== undefined ? [opts.subfolder] : []), [opts.lrs_id,
        'activityProfiles']));
});
