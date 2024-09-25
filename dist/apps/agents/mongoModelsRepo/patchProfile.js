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
/* tslint:disable:max-file-line-count */
var lodash_1 = require("lodash");
var IfMatch_1 = __importDefault(require("../errors/IfMatch"));
var IfNoneMatch_1 = __importDefault(require("../errors/IfNoneMatch"));
var MaxEtags_1 = __importDefault(require("../errors/MaxEtags"));
var NonJsonObject_1 = __importDefault(require("../errors/NonJsonObject"));
var constants_1 = require("../utils/constants");
var constants_2 = require("./utils/constants");
var getEtagFilter_1 = __importDefault(require("./utils/getEtagFilter"));
var getProfileFilter_1 = __importDefault(require("./utils/getProfileFilter"));
// Within this code, Etags (ifMatch/ifNoneMatch) are used to manage concurrent creates/updates.
// Docs: https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Communication.md#concurrency
exports.default = (function (config) {
    return function (opts) { return __awaiter(void 0, void 0, void 0, function () {
        var collection, checkIfMatch, checkIfNoneMatch, profileFilter, contentPatch, update, ifMatchFilter, updateOpResult, updatedDocuments, createOpResult, wasCreated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, config.db()];
                case 1:
                    collection = (_a.sent()).collection(constants_2.COLLECTION_NAME);
                    checkIfMatch = opts.ifMatch !== undefined;
                    checkIfNoneMatch = opts.ifNoneMatch === '*';
                    if (checkIfMatch && checkIfNoneMatch) {
                        throw new MaxEtags_1.default();
                    }
                    profileFilter = getProfileFilter_1.default(opts);
                    contentPatch = lodash_1.mapKeys(opts.content, function (_value, key) {
                        return "content." + key;
                    });
                    update = {
                        // Overwrites the content and contentType.
                        contentType: constants_1.jsonContentType,
                        etag: opts.etag,
                        extension: 'json',
                        isObjectContent: true,
                        // Updates updatedAt time.
                        updatedAt: new Date(),
                    };
                    if (!!checkIfNoneMatch) return [3 /*break*/, 3];
                    ifMatchFilter = getEtagFilter_1.default(opts.ifMatch);
                    return [4 /*yield*/, collection.findOneAndUpdate(__assign(__assign(__assign({}, ifMatchFilter), constants_2.JSON_OBJECT_FILTER), profileFilter), {
                            $set: __assign(__assign({}, contentPatch), update),
                        }, {
                            returnOriginal: false,
                            upsert: false,
                        })];
                case 2:
                    updateOpResult = _a.sent();
                    updatedDocuments = updateOpResult.lastErrorObject.n;
                    if (updatedDocuments === 1) {
                        return [2 /*return*/];
                    }
                    _a.label = 3;
                case 3: return [4 /*yield*/, collection.findOneAndUpdate(profileFilter, {
                        $setOnInsert: __assign({ content: opts.content }, update),
                    }, {
                        returnOriginal: false,
                        upsert: true,
                    })];
                case 4:
                    createOpResult = _a.sent();
                    wasCreated = createOpResult.lastErrorObject.upserted !== undefined;
                    // When the profile is found at the create stage but not the update stage,
                    // And the ifNoneMatch option was not provided.
                    // Then the exsting profile either has the wrong content or didn't match the ifMatch option.
                    if (!wasCreated && !checkIfNoneMatch) {
                        if (checkIfMatch && createOpResult.value.etag !== opts.ifMatch) {
                            throw new IfMatch_1.default();
                        }
                        throw new NonJsonObject_1.default();
                    }
                    // When the ifNoneMatch option is provided.
                    // No profile should be created when it already exists, hence we throw this error.
                    if (!wasCreated && checkIfNoneMatch) {
                        throw new IfNoneMatch_1.default();
                    }
                    return [2 /*return*/];
            }
        });
    }); };
});
