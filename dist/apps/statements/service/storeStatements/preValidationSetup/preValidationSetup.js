"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var modr = __importStar(require("../../../utils/modr"));
var lowerCaseActors_1 = require("./lowerCaseActors");
var removeNulls_1 = __importDefault(require("./removeNulls"));
var wrapContextActivitiesInArrays_1 = require("./wrapContextActivitiesInArrays");
exports.default = (function (config, models) {
    return models.map(function (model) {
        var setup = modr.composeModifiers([
            removeNulls_1.default(config),
            lowerCaseActors_1.lowerCaseActors(config),
            wrapContextActivitiesInArrays_1.wrapContextActivitiesInArrays,
        ]);
        var setupModel = setup(model);
        return setupModel;
    });
});
