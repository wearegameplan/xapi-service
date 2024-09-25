"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var factory_1 = require("@learninglocker/xapi-validation/dist/factory");
var rulr = __importStar(require("rulr"));
var versionHeaderValidator = rulr.maybe(rulr.required(factory_1.version));
exports.default = (function (headerVal) {
    versionHeaderValidator(headerVal, ['header', 'X-Experience-API-Version']);
});
