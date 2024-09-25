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
Object.defineProperty(exports, "__esModule", { value: true });
var getActorWithId = function (actor) {
    if (actor.account !== undefined) {
        return { account: actor.account };
    }
    if (actor.mbox !== undefined) {
        return { mbox: actor.mbox };
    }
    if (actor.mbox_sha1sum !== undefined) {
        return { mbox_sha1sum: actor.mbox_sha1sum };
    }
    if (actor.openid !== undefined) {
        return { openid: actor.openid };
    }
    return {};
};
var getActorWithMembers = function (actor) {
    return ((actor.objectType === 'Group' && actor.member !== undefined) ?
        // tslint:disable-next-line:no-use-before-declare
        { member: actor.member.map(formatActor) } :
        {});
};
var formatActor = function (actor) {
    var actorWithId = getActorWithId(actor);
    var actorWithMembers = (Object.keys(actorWithId).length > 0 ? {} :
        getActorWithMembers(actor));
    return __assign(__assign(__assign({}, (actor.objectType !== 'Agent' ? { objectType: actor.objectType } : {})), actorWithId), actorWithMembers);
};
exports.default = formatActor;
