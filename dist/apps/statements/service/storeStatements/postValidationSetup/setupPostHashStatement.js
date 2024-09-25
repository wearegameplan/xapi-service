"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../../../utils/constants");
var modr = __importStar(require("../../../utils/modr"));
exports.default = (function (model, storedTime, authority) {
    return modr.modifySchema({
        timestamp: modr.defaultValue(function () { return storedTime; }),
        stored: modr.overrideValue(storedTime),
        // Adds LRS properties.
        authority: modr.overrideValue(authority),
        version: modr.defaultValue(function () { return constants_1.xapiStatementVersion; }),
    })(model);
});
