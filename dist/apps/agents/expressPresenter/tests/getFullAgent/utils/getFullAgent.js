"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../../../../utils/constants");
var testValues_1 = require("../../../../utils/testValues");
var supertest_1 = __importDefault(require("../../utils/supertest"));
exports.default = (function (agent) {
    if (agent === void 0) { agent = testValues_1.TEST_MBOX_AGENT; }
    return supertest_1.default
        .get(constants_1.route)
        .set('X-Experience-API-Version', constants_1.xapiHeaderVersion)
        .query({
        agent: JSON.stringify(agent),
    });
});
