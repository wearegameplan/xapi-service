"use strict";
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
var stream_to_string_1 = __importDefault(require("stream-to-string"));
var Conflict_1 = __importDefault(require("../errors/Conflict"));
var MissingEtags_1 = __importDefault(require("../errors/MissingEtags"));
var constants_1 = require("../utils/constants");
var getFileExtension_1 = __importDefault(require("../utils/getFileExtension"));
var parseJson_1 = __importDefault(require("../utils/parseJson"));
var checkProfileWriteScopes_1 = __importDefault(require("./utils/checkProfileWriteScopes"));
var createEtag_1 = __importDefault(require("./utils/createEtag"));
var validateActivityId_1 = __importDefault(require("./utils/validateActivityId"));
exports.default = (function (config) {
    return function (opts) { return __awaiter(void 0, void 0, void 0, function () {
        var etag, hasProfile, jsonContent, _a, _b, extension, overwriteProfileResult;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    checkProfileWriteScopes_1.default(opts.client.scopes);
                    validateActivityId_1.default(opts.activityId);
                    etag = createEtag_1.default();
                    if (!(opts.ifMatch === undefined && opts.ifNoneMatch === undefined)) return [3 /*break*/, 2];
                    return [4 /*yield*/, config.repo.hasProfile({
                            activityId: opts.activityId,
                            client: opts.client,
                            profileId: opts.profileId,
                        })];
                case 1:
                    hasProfile = (_c.sent()).hasProfile;
                    if (hasProfile) {
                        throw new Conflict_1.default();
                    }
                    else {
                        throw new MissingEtags_1.default();
                    }
                    _c.label = 2;
                case 2:
                    if (!(opts.contentType === constants_1.jsonContentType)) return [3 /*break*/, 4];
                    _b = parseJson_1.default;
                    return [4 /*yield*/, stream_to_string_1.default(opts.content)];
                case 3:
                    _a = _b.apply(void 0, [_c.sent(), ['content']]);
                    return [3 /*break*/, 5];
                case 4:
                    _a = undefined;
                    _c.label = 5;
                case 5:
                    jsonContent = (_a);
                    extension = getFileExtension_1.default(opts.contentType);
                    return [4 /*yield*/, config.repo.overwriteProfile({
                            activityId: opts.activityId,
                            client: opts.client,
                            content: jsonContent,
                            contentType: opts.contentType,
                            etag: etag,
                            extension: extension,
                            ifMatch: opts.ifMatch,
                            ifNoneMatch: opts.ifNoneMatch,
                            profileId: opts.profileId,
                        })];
                case 6:
                    overwriteProfileResult = _c.sent();
                    if (!(opts.contentType !== constants_1.jsonContentType)) return [3 /*break*/, 8];
                    return [4 /*yield*/, config.repo.storeProfileContent({
                            content: opts.content,
                            key: overwriteProfileResult.id + "." + extension,
                            lrs_id: opts.client.lrs_id,
                        })];
                case 7:
                    _c.sent();
                    _c.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    }); };
});
