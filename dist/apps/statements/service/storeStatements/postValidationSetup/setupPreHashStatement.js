"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var modr = __importStar(require("../../../utils/modr"));
exports.default = (function (model) {
    return modr.modifyRestrictedSchema({
        // Adds the required properties from the model.
        id: modr.defaultValue(uuid_1.v4),
        actor: modr.keepValue,
        verb: modr.keepValue,
        object: modr.keepValue,
        // Adds the optional properties from the model.
        context: modr.keepValue,
        result: modr.keepValue,
        attachments: modr.keepValue,
        timestamp: modr.keepValue,
    })(model);
});
