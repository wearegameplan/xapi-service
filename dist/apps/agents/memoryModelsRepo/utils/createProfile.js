"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
exports.default = (function (config, opts) {
    var profile = {
        agent: opts.agent,
        content: opts.content,
        contentType: opts.contentType,
        etag: opts.etag,
        extension: opts.extension,
        id: uuid_1.v4(),
        lrs: opts.client.lrs_id,
        organisation: opts.client.organisation,
        profileId: opts.profileId,
        updatedAt: new Date(),
    };
    config.state.agentProfiles = __spreadArrays(config.state.agentProfiles, [
        profile,
    ]);
    return profile;
});
