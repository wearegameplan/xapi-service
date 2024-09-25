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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Forbidden_1 = __importDefault(require("jscommons/dist/errors/Forbidden"));
var NoModel_1 = __importDefault(require("jscommons/dist/errors/NoModel"));
var assertError_1 = __importDefault(require("jscommons/dist/tests/utils/assertError"));
var lodash_1 = require("lodash");
var scopes = __importStar(require("../../utils/scopes"));
var scopes_1 = __importDefault(require("../../utils/scopes"));
var createClientModel_1 = __importDefault(require("../utils/createClientModel"));
var createStatement_1 = __importDefault(require("../utils/createStatement"));
var setup_1 = __importDefault(require("../utils/setup"));
var storeStatementsInService_1 = __importDefault(require("../utils/storeStatementsInService"));
var TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
var TEST_STATEMENT = createStatement_1.default({ id: TEST_ID });
var TEST_FORBIDDEN_SCOPES = lodash_1.difference(scopes_1.default, scopes.STATEMENT_READ_SCOPES);
describe('get statement with scopes', function () {
    var service = setup_1.default();
    var storeStatements = storeStatementsInService_1.default(service);
    var testReadAllScope = function (clientScopes) { return __awaiter(void 0, void 0, void 0, function () {
        var client;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = createClientModel_1.default({ _id: '59890d100000000000000000', scopes: clientScopes });
                    return [4 /*yield*/, storeStatements([TEST_STATEMENT])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, service.getStatement({ id: TEST_ID, voided: false, client: client })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    it('should throw an error when using a different client with read mine scope', function () { return __awaiter(void 0, void 0, void 0, function () {
        var client, promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = createClientModel_1.default({
                        _id: '59890d100000000000000000',
                        scopes: [scopes.XAPI_STATEMENTS_READ_MINE],
                    });
                    return [4 /*yield*/, storeStatements([TEST_STATEMENT])];
                case 1:
                    _a.sent();
                    promise = service.getStatement({ id: TEST_ID, voided: false, client: client });
                    return [4 /*yield*/, assertError_1.default(NoModel_1.default, promise)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a statement when using a different client with xAPI all scope', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testReadAllScope([scopes.XAPI_ALL])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a statement when using a different client with xAPI read scope', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testReadAllScope([scopes.XAPI_READ])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a statement when using a different client with xAPI read statements scope', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testReadAllScope([scopes.XAPI_STATEMENTS_READ])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a statement when using a different client with read all scope', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testReadAllScope([scopes.ALL_READ])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw an error when using a forbidden read scope', function () { return __awaiter(void 0, void 0, void 0, function () {
        var client, promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = createClientModel_1.default({
                        _id: '59890d100000000000000000',
                        scopes: TEST_FORBIDDEN_SCOPES,
                    });
                    return [4 /*yield*/, storeStatements([TEST_STATEMENT])];
                case 1:
                    _a.sent();
                    promise = service.getStatement({ id: TEST_ID, voided: false, client: client });
                    return [4 /*yield*/, assertError_1.default(Forbidden_1.default, promise)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
