"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isMatchingAgent_1 = __importDefault(require("./isMatchingAgent"));
var isMatchingRegistration_1 = __importDefault(require("./isMatchingRegistration"));
exports.default = (function (state, opts) {
    return (state.activityId === opts.activityId &&
        isMatchingAgent_1.default(state.agent, opts.agent) &&
        isMatchingRegistration_1.default(state.registration, opts.registration) &&
        state.lrs === opts.client.lrs_id &&
        state.organisation === opts.client.organisation);
});
