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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var object_hash_1 = require("object-hash");
var getActivitiesFromStatement_1 = require("../queriables/getActivitiesFromStatement");
var getAgentsFromStatement_1 = require("../queriables/getAgentsFromStatement");
var getMetadataFromStatement_1 = __importDefault(require("../queriables/getMetadataFromStatement"));
var getRegistrationsFromStatement_1 = __importDefault(require("../queriables/getRegistrationsFromStatement"));
var getVerbsFromStatement_1 = __importDefault(require("../queriables/getVerbsFromStatement"));
var checkSignedStatements_1 = __importDefault(require("./checkSignedStatements"));
var setupObjectTypes_1 = __importDefault(require("./setupObjectTypes"));
var setupPostHashStatement_1 = __importDefault(require("./setupPostHashStatement"));
var setupPreHashStatement_1 = __importDefault(require("./setupPreHashStatement"));
exports.default = (function (models, attachments, client) { return __awaiter(void 0, void 0, void 0, function () {
    var storedTime, storedTimeString, hashAttachmentDictionary, uniqueHashAttachmentDictionary, unstoredModelPromises, unstoredModels;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                storedTime = new Date();
                storedTimeString = storedTime.toISOString();
                hashAttachmentDictionary = lodash_1.groupBy(attachments, function (attachment) {
                    return attachment.hash;
                });
                uniqueHashAttachmentDictionary = lodash_1.mapValues(hashAttachmentDictionary, function (groupedAttachments) {
                    return groupedAttachments[0];
                });
                unstoredModelPromises = models.map(function (model) { return __awaiter(void 0, void 0, void 0, function () {
                    var objectTypesModel, preHashStatement, fullStatementWithID, postHashStatement, timestampTime;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                objectTypesModel = setupObjectTypes_1.default(model);
                                return [4 /*yield*/, checkSignedStatements_1.default(objectTypesModel, uniqueHashAttachmentDictionary)];
                            case 1:
                                _a.sent();
                                preHashStatement = setupPreHashStatement_1.default(objectTypesModel);
                                fullStatementWithID = __assign(__assign({}, objectTypesModel), preHashStatement);
                                postHashStatement = setupPostHashStatement_1.default(fullStatementWithID, storedTimeString, client.authority);
                                timestampTime = new Date(postHashStatement.timestamp);
                                return [2 /*return*/, {
                                        hasGeneratedId: model.id === undefined,
                                        organisation: client.organisation,
                                        lrs_id: client.lrs_id,
                                        client: client._id,
                                        person: null,
                                        active: true,
                                        voided: false,
                                        timestamp: timestampTime,
                                        stored: storedTime,
                                        hash: object_hash_1.sha1(preHashStatement),
                                        agents: getAgentsFromStatement_1.getAgentsFromStatement(postHashStatement),
                                        relatedAgents: getAgentsFromStatement_1.getRelatedAgentsFromStatement(postHashStatement),
                                        registrations: getRegistrationsFromStatement_1.default(postHashStatement),
                                        verbs: getVerbsFromStatement_1.default(postHashStatement),
                                        activities: getActivitiesFromStatement_1.getActivitiesFromStatement(postHashStatement),
                                        relatedActivities: getActivitiesFromStatement_1.getRelatedActivitiesFromStatement(postHashStatement),
                                        statement: postHashStatement,
                                        metadata: getMetadataFromStatement_1.default(postHashStatement),
                                    }];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(unstoredModelPromises)];
            case 1:
                unstoredModels = _a.sent();
                return [2 /*return*/, unstoredModels];
        }
    });
}); });
