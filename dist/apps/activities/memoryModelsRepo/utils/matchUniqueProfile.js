"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var matchProfileIdentifier_1 = __importDefault(require("./matchProfileIdentifier"));
exports.default = (function (_a) {
    var client = _a.client, activityId = _a.activityId, profile = _a.profile, profileId = _a.profileId;
    return (matchProfileIdentifier_1.default({ client: client, activityId: activityId, profile: profile }) &&
        profile.profileId === profileId);
});
