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
var wrapObjectInArray = modr.modifyType(Object, function (data) {
    return [data];
});
var modifyContext = modr.modifySchema({
    contextActivities: modr.modifySchema({
        parent: wrapObjectInArray,
        grouping: wrapObjectInArray,
        category: wrapObjectInArray,
        other: wrapObjectInArray,
    }),
});
var modifySubStatement = modr.modifySchema({
    context: modifyContext,
});
exports.wrapContextActivitiesInArrays = modr.modifySchema({
    context: modifyContext,
    object: modr.modifyType(Object, function (data) {
        return (data.objectType === 'SubStatement'
            ? modifySubStatement(data)
            : data);
    }),
});
