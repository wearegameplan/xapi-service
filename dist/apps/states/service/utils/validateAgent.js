"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var xapi = __importStar(require("@learninglocker/xapi-validation/dist/factory"));
var IfiCountWarning_1 = __importDefault(require("@learninglocker/xapi-validation/dist/warnings/IfiCountWarning"));
var NoIfiWarning_1 = __importDefault(require("@learninglocker/xapi-validation/dist/warnings/NoIfiWarning"));
var lodash_1 = require("lodash");
var rulr = __importStar(require("rulr"));
var rule = rulr.maybe(rulr.composeRules([
    rulr.restrictToSchema({
        account: rulr.optional(xapi.account),
        mbox: rulr.optional(xapi.mailto),
        mbox_sha1sum: rulr.optional(xapi.sha1),
        name: rulr.optional(xapi.stringValue),
        objectType: rulr.optional(xapi.stringValue),
        openid: rulr.optional(xapi.iri),
    }),
    function (data, path) {
        var trimmedAgent = lodash_1.pick(data, ['account', 'mbox', 'mbox_sha1sum', 'openid']);
        var keys = Object.keys(trimmedAgent);
        if (keys.length > 1) {
            return [new IfiCountWarning_1.default(data, path, keys)];
        }
        if (keys.length === 0) {
            return [new NoIfiWarning_1.default(data, path)];
        }
        return [];
    },
]));
exports.default = (function (data) {
    return rule(data, ['agent']);
});
