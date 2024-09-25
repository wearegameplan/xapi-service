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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var mongodb_1 = require("mongodb");
var scopes = __importStar(require("../../../../utils/scopes"));
var READ_ALL_SCOPES = [
    scopes.ALL,
    scopes.ALL_READ,
    scopes.XAPI_ALL,
    scopes.XAPI_READ,
    scopes.XAPI_STATEMENTS_READ,
];
exports.default = (function (client, enableReadMine) {
    if (enableReadMine === void 0) { enableReadMine = false; }
    var canOnlyReadMine = (enableReadMine &&
        lodash_1.intersection(READ_ALL_SCOPES, client.scopes).length === 0 &&
        lodash_1.includes(client.scopes, scopes.XAPI_STATEMENTS_READ_MINE));
    return __assign({ organisation: new mongodb_1.ObjectID(client.organisation), lrs_id: new mongodb_1.ObjectID(client.lrs_id) }, (canOnlyReadMine
        ? { client: new mongodb_1.ObjectID(client._id) }
        : {}));
});
