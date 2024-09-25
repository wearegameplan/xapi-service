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
var constants_1 = require("../../../../utils/constants");
var testValues_1 = require("../../../../utils/testValues");
var supertest_1 = __importDefault(require("../../utils/supertest"));
exports.default = (function (optsOverrides, sendVersion) {
    if (optsOverrides === void 0) { optsOverrides = {}; }
    if (sendVersion === void 0) { sendVersion = true; }
    var activityId = testValues_1.TEST_ACTIVITY_ID;
    var agent = JSON.stringify(testValues_1.TEST_MBOX_AGENT);
    var registration = testValues_1.TEST_REGISTRATION;
    var stateId = testValues_1.TEST_STATE_ID;
    var req = supertest_1.default.get(constants_1.route);
    if (sendVersion) {
        req.set('X-Experience-API-Version', constants_1.xapiHeaderVersion);
    }
    return req.query(__assign({ activityId: activityId,
        agent: agent,
        registration: registration,
        stateId: stateId }, optsOverrides));
});
