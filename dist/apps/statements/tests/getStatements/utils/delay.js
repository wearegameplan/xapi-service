"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Ryan: I wish we didn't have to do this, but time filters use stored not timestamp.
exports.default = (function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
});
