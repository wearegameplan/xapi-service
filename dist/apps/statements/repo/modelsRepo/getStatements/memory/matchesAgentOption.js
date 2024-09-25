"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getActorIdent_1 = __importDefault(require("../../../../utils/getActorIdent"));
exports.default = (function (model, opts) {
    if (opts.agent === undefined) {
        return true;
    }
    var agentIdent = getActorIdent_1.default(opts.agent);
    if (opts.related_agents === true) {
        return model.relatedAgents.indexOf(agentIdent) > -1;
    }
    return model.agents.indexOf(agentIdent) > -1;
});
