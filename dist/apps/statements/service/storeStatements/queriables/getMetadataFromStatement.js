"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var moment = __importStar(require("moment"));
exports.default = (function (statement) {
    if (lodash_1.has(statement, ['result', 'duration'])) {
        var duration = lodash_1.get(statement, ['result', 'duration']);
        var seconds = moment.duration(duration).as('seconds');
        return { 'https://learninglocker&46;net/result-duration': { seconds: seconds } };
    }
    return {};
});
