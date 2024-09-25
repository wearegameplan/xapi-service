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
var assert_1 = __importDefault(require("assert"));
var createClientModel_1 = __importDefault(require("./utils/createClientModel"));
var createStatement_1 = __importDefault(require("./utils/createStatement"));
var setup_1 = __importDefault(require("./utils/setup"));
var storeStatementsInService_1 = __importDefault(require("./utils/storeStatementsInService"));
var LRS2_ID = '5988f0f00000000000000002';
var LRS2_AUTHORITY = {
    objectType: 'Agent',
    mbox: 'mailto:lrs2@test.com',
};
var LRS2_CLIENT = createClientModel_1.default({
    lrs_id: LRS2_ID,
    authority: LRS2_AUTHORITY,
});
var TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
var TEST_STATEMENT = createStatement_1.default({ id: TEST_ID });
var TEST_CLIENT = createClientModel_1.default();
describe('insert across 2 different stores with the same id', function () {
    var service = setup_1.default();
    var storeStatements = storeStatementsInService_1.default(service);
    it('should return the correct statements when calling getStatements', function () { return __awaiter(void 0, void 0, void 0, function () {
        var LRS2_STATEMENT_INSERT, LRS1_STATEMENT, LRS2_STATEMENT;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    LRS2_STATEMENT_INSERT = createStatement_1.default({
                        id: TEST_ID,
                    });
                    return [4 /*yield*/, storeStatements([TEST_STATEMENT], [], TEST_CLIENT)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, storeStatements([LRS2_STATEMENT_INSERT], [], LRS2_CLIENT)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, service.getStatements({ client: TEST_CLIENT })];
                case 3:
                    LRS1_STATEMENT = _a.sent();
                    return [4 /*yield*/, service.getStatements({ client: LRS2_CLIENT })];
                case 4:
                    LRS2_STATEMENT = _a.sent();
                    assert_1.default.equal(LRS1_STATEMENT.statements[0].authority.mbox, TEST_CLIENT.authority.mbox);
                    assert_1.default.equal(LRS2_STATEMENT.statements[0].authority.mbox, LRS2_CLIENT.authority.mbox);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the correct statement when calling getStatements', function () { return __awaiter(void 0, void 0, void 0, function () {
        var LRS2_STATEMENT_INSERT, LRS1_STATEMENT, LRS2_STATEMENT;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    LRS2_STATEMENT_INSERT = createStatement_1.default({
                        id: TEST_ID,
                    });
                    return [4 /*yield*/, storeStatements([TEST_STATEMENT], [], TEST_CLIENT)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, storeStatements([LRS2_STATEMENT_INSERT], [], LRS2_CLIENT)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, service.getStatement({
                            id: TEST_ID,
                            voided: false,
                            client: TEST_CLIENT,
                        })];
                case 3:
                    LRS1_STATEMENT = _a.sent();
                    return [4 /*yield*/, service.getStatement({
                            id: TEST_ID,
                            voided: false,
                            client: LRS2_CLIENT,
                        })];
                case 4:
                    LRS2_STATEMENT = _a.sent();
                    assert_1.default.equal(LRS1_STATEMENT.statements[0].authority.mbox, TEST_CLIENT.authority.mbox);
                    assert_1.default.equal(LRS2_STATEMENT.statements[0].authority.mbox, LRS2_CLIENT.authority.mbox);
                    return [2 /*return*/];
            }
        });
    }); });
});
