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
var createClientModel_1 = __importDefault(require("../../utils/createClientModel"));
var createContext_1 = __importDefault(require("../../utils/createContext"));
var createStatement_1 = __importDefault(require("../../utils/createStatement"));
var createSubStatement_1 = __importDefault(require("../../utils/createSubStatement"));
var createSubStatementContext_1 = __importDefault(require("../../utils/createSubStatementContext"));
var setup_1 = __importDefault(require("../../utils/setup"));
var storeStatementsInService_1 = __importDefault(require("../../utils/storeStatementsInService"));
var TEST_TARGET_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
var TEST_MISSING_ID = '1c86d8e9-f325-404f-b3d9-24c451035583';
var TEST_TARGET_ACTIVITY = 'http://www.example.com/object/1';
var TEST_MISSING_ACTIVITY = 'http://www.example.com/object/2';
var TEST_CLIENT = createClientModel_1.default();
exports.default = (function (assertFilteredStatements) {
    var service = setup_1.default();
    var storeStatements = storeStatementsInService_1.default(service);
    var assertFilter = function (createActivity, relatedActivities) {
        if (relatedActivities === void 0) { relatedActivities = false; }
        return __awaiter(void 0, void 0, void 0, function () {
            var statement1, statement2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        statement1 = createStatement_1.default(__assign({ id: TEST_TARGET_ID }, createActivity({ objectType: 'Activity', id: TEST_TARGET_ACTIVITY })));
                        statement2 = createStatement_1.default(__assign({ id: TEST_MISSING_ID }, createActivity({ objectType: 'Activity', id: TEST_MISSING_ACTIVITY })));
                        return [4 /*yield*/, storeStatements([statement1, statement2])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, assertFilteredStatements(service)({
                                activity: TEST_TARGET_ACTIVITY,
                                related_activities: relatedActivities,
                                client: TEST_CLIENT,
                            }, [TEST_TARGET_ID])];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    it('should return statements when they match the activity in the object', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, assertFilter(function (object) {
                        return { object: object };
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return statements when they match the activity in the parent', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, assertFilter(function (activity) {
                        return createContext_1.default({ parent: [activity] });
                    }, true)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return statements when they match the activity in the grouping', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, assertFilter(function (activity) {
                        return createContext_1.default({ grouping: [activity] });
                    }, true)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return statements when they match the activity in the category', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, assertFilter(function (activity) {
                        return createContext_1.default({ category: [activity] });
                    }, true)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return statements when they match the activity in the other', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, assertFilter(function (activity) {
                        return createContext_1.default({ other: [activity] });
                    }, true)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return statements when they match the activity in the sub statement object', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, assertFilter(function (object) {
                        return createSubStatement_1.default({ object: object });
                    }, true)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return statements when they match the activity in the sub statement parent', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, assertFilter(function (activity) {
                        return createSubStatementContext_1.default({ parent: [activity] });
                    }, true)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return statements when they match the activity in the sub statement grouping', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, assertFilter(function (activity) {
                        return createSubStatementContext_1.default({ grouping: [activity] });
                    }, true)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return statements when they match the activity in the sub statement category', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, assertFilter(function (activity) {
                        return createSubStatementContext_1.default({ category: [activity] });
                    }, true)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return statements when they match the activity in the sub statement other', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, assertFilter(function (activity) {
                        return createSubStatementContext_1.default({ other: [activity] });
                    }, true)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    // tslint:disable-next-line:max-file-line-count
});
