"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var removeDuplicates_1 = __importDefault(require("../../utils/removeDuplicates"));
var getStatementBaseAttachments = function (statement) {
    var attachments = statement.attachments;
    if (attachments === undefined) {
        return [];
    }
    return attachments;
};
exports.default = (function (models) {
    var attachments = models.reduce(function (results, model) {
        var statementAttachments = getStatementBaseAttachments(model.statement);
        var subStatementAttachments = (model.statement.object.objectType === 'SubStatement'
            ? getStatementBaseAttachments(model.statement.object)
            : []);
        return __spreadArrays(results, statementAttachments, subStatementAttachments);
    }, []);
    var uniqueAttachments = removeDuplicates_1.default(attachments, function (attachment) {
        return attachment.sha2;
    });
    return uniqueAttachments;
});
