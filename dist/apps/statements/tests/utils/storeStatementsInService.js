"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createClientModel_1 = __importDefault(require("./createClientModel"));
var storeAwaitedStatements_1 = __importDefault(require("./storeAwaitedStatements"));
exports.default = (function (service) {
    return function (statements, attachments, client) {
        if (attachments === void 0) { attachments = []; }
        if (client === void 0) { client = createClientModel_1.default(); }
        return storeAwaitedStatements_1.default(service)({
            models: statements,
            attachments: attachments,
            client: client,
        });
    };
});
