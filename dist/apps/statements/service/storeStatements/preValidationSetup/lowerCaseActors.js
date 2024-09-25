"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var modr = __importStar(require("../../../utils/modr"));
var lowerCaseString = modr.modifyType(String, function (data) {
    return data.toLowerCase();
});
var lowerCaseIfis = modr.modifySchema({
    mbox: lowerCaseString,
    openid: lowerCaseString,
    account: modr.modifySchema({
        name: lowerCaseString,
        homePage: lowerCaseString,
    }),
    member: modr.modifyCollection(function () { return lowerCaseIfis; }),
});
var lowerCaseIfisInObject = modr.modifyType(Object, function (data) {
    if (data.objectType === 'SubStatement') {
        return modr.modifySchema({
            actor: lowerCaseIfis,
            object: lowerCaseIfis,
            context: modr.modifySchema({
                instructor: lowerCaseIfis,
            }),
        })(data);
    }
    return lowerCaseIfis(data);
});
exports.lowerCaseActors = function (config) {
    if (!config.enableActorLowerCasing) {
        return modr.keepValue;
    }
    return modr.modifySchema({
        actor: lowerCaseIfis,
        object: lowerCaseIfisInObject,
        context: modr.modifySchema({
            instructor: lowerCaseIfis,
        }),
    });
};
