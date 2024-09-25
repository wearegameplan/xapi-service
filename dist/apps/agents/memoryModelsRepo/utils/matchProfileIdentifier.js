"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isMatchingAgent_1 = __importDefault(require("./isMatchingAgent"));
exports.default = (function (_a) {
    var client = _a.client, agent = _a.agent, profile = _a.profile;
    return (profile.organisation === client.organisation &&
        profile.lrs === client.lrs_id &&
        isMatchingAgent_1.default(profile.agent, agent));
});
