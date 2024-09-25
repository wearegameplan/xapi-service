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
var assert_1 = __importDefault(require("assert"));
var config_1 = __importDefault(require("../../../../config"));
var logger_1 = __importDefault(require("../../../../logger"));
var tracker_1 = __importDefault(require("../../../../tracker"));
var repo_1 = __importDefault(require("../../repo"));
var index_1 = __importDefault(require("../../service/index"));
var createClientModel_1 = __importDefault(require("../utils/createClientModel"));
var createStatement_1 = __importDefault(require("../utils/createStatement"));
var storeStatementsInService_1 = __importDefault(require("../utils/storeStatementsInService"));
var TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
var TEST_CLIENT = createClientModel_1.default();
var TEST_ACCOUNT = {
    homePage: 'HTTP://WWW.EXAMPLE.ORG/USER',
    name: 'TEST_USER',
};
var TEST_MBOX = 'MAILTO:TEST@EXAMPLE.ORG';
var TEST_OPENID = 'HTTP://WWW.EXAMPLE.ORG/USER/1';
var TEST_STATEMENT = {
    id: TEST_ID,
    actor: {
        objectType: 'Group',
        account: TEST_ACCOUNT,
        member: [{
                objectType: 'Agent',
                mbox: TEST_MBOX,
            }, {
                objectType: 'Agent',
                openid: TEST_OPENID,
            }],
    },
    verb: { id: 'http://www.example.org/verb' },
    object: {
        objectType: 'SubStatement',
        actor: {
            objectType: 'Group',
            account: TEST_ACCOUNT,
            member: [{
                    objectType: 'Agent',
                    mbox: TEST_MBOX,
                }, {
                    objectType: 'Agent',
                    openid: TEST_OPENID,
                }],
        },
        verb: { id: 'http://www.example.org/verb' },
        object: {
            objectType: 'Group',
            account: TEST_ACCOUNT,
            member: [{
                    objectType: 'Agent',
                    mbox: TEST_MBOX,
                }, {
                    objectType: 'Agent',
                    openid: TEST_OPENID,
                }],
        },
        context: {
            instructor: {
                objectType: 'Agent',
                mbox: TEST_MBOX,
            },
        },
    },
    context: {
        instructor: {
            objectType: 'Agent',
            account: TEST_ACCOUNT,
        },
    },
};
var EXPECTED_TEST_STATEMENT = {
    id: TEST_STATEMENT.id,
    actor: {
        objectType: TEST_STATEMENT.actor.objectType,
        account: {
            homePage: TEST_ACCOUNT.homePage.toLowerCase(),
            name: TEST_ACCOUNT.name.toLowerCase(),
        },
        member: [{
                objectType: TEST_STATEMENT.actor.member[0].objectType,
                mbox: TEST_MBOX.toLowerCase(),
            }, {
                objectType: TEST_STATEMENT.actor.member[1].objectType,
                openid: TEST_OPENID.toLowerCase(),
            }],
    },
    verb: TEST_STATEMENT.verb,
    object: {
        objectType: TEST_STATEMENT.object.objectType,
        actor: {
            objectType: TEST_STATEMENT.object.actor.objectType,
            account: {
                homePage: TEST_ACCOUNT.homePage.toLowerCase(),
                name: TEST_ACCOUNT.name.toLowerCase(),
            },
            member: [{
                    objectType: TEST_STATEMENT.object.actor.member[0].objectType,
                    mbox: TEST_MBOX.toLowerCase(),
                }, {
                    objectType: TEST_STATEMENT.object.actor.member[1].objectType,
                    openid: TEST_OPENID.toLowerCase(),
                }],
        },
        verb: TEST_STATEMENT.object.verb,
        object: {
            objectType: TEST_STATEMENT.object.object.objectType,
            account: {
                homePage: TEST_ACCOUNT.homePage.toLowerCase(),
                name: TEST_ACCOUNT.name.toLowerCase(),
            },
            member: [{
                    objectType: TEST_STATEMENT.object.object.member[0].objectType,
                    mbox: TEST_MBOX.toLowerCase(),
                }, {
                    objectType: TEST_STATEMENT.object.object.member[1].objectType,
                    openid: TEST_OPENID.toLowerCase(),
                }],
        },
        context: {
            instructor: {
                objectType: TEST_STATEMENT.object.context.instructor.objectType,
                mbox: TEST_MBOX.toLowerCase(),
            },
        },
    },
    context: {
        instructor: {
            objectType: TEST_STATEMENT.context.instructor.objectType,
            account: {
                homePage: TEST_ACCOUNT.homePage.toLowerCase(),
                name: TEST_ACCOUNT.name.toLowerCase(),
            },
        },
    },
};
describe(__filename, function () {
    var service = index_1.default(__assign(__assign({}, config_1.default.statementsService), { enableActorLowerCasing: true, repo: repo_1.default,
        tracker: tracker_1.default,
        logger: logger_1.default }));
    var storeStatements = storeStatementsInService_1.default(service);
    var getStatement = function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.getStatement({ id: TEST_ID, voided: false, client: TEST_CLIENT })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.statements[0]];
            }
        });
    }); };
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.clearService()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should lower case IFIs with sub statements', function () { return __awaiter(void 0, void 0, void 0, function () {
        var actualStatement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storeStatements([createStatement_1.default(TEST_STATEMENT)])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getStatement()];
                case 2:
                    actualStatement = _a.sent();
                    assert_1.default.deepEqual(actualStatement, __assign(__assign({}, actualStatement), EXPECTED_TEST_STATEMENT));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should lower case IFIs without sub statements', function () { return __awaiter(void 0, void 0, void 0, function () {
        var testStatement, expectedStatement, actualStatement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testStatement = __assign(__assign({}, TEST_STATEMENT), { object: TEST_STATEMENT.object.object });
                    expectedStatement = __assign(__assign({}, EXPECTED_TEST_STATEMENT), { object: EXPECTED_TEST_STATEMENT.object.object });
                    return [4 /*yield*/, storeStatements([createStatement_1.default(testStatement)])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getStatement()];
                case 2:
                    actualStatement = _a.sent();
                    assert_1.default.deepEqual(actualStatement, __assign(__assign({}, actualStatement), expectedStatement));
                    return [2 /*return*/];
            }
        });
    }); });
    // tslint:disable-next-line:max-file-line-count
});
