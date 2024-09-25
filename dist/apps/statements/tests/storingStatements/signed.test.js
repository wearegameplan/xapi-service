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
var assertError_1 = __importDefault(require("jscommons/dist/tests/utils/assertError"));
var InvalidJws_1 = __importDefault(require("../../errors/InvalidJws"));
var InvalidSignatureAlgorithm_1 = __importDefault(require("../../errors/InvalidSignatureAlgorithm"));
var InvalidSignedStatement_1 = __importDefault(require("../../errors/InvalidSignedStatement"));
var InvalidX5CChain_1 = __importDefault(require("../../errors/InvalidX5CChain"));
var InvalidX5CType_1 = __importDefault(require("../../errors/InvalidX5CType"));
var JsonSyntaxError_1 = __importDefault(require("../../errors/JsonSyntaxError"));
var createAttachment_1 = __importDefault(require("../utils/createAttachment"));
var createAttachmentModel_1 = __importDefault(require("../utils/createAttachmentModel"));
var createAttachmentStatement_1 = __importDefault(require("../utils/createAttachmentStatement"));
var createSignatureAttachment_1 = __importDefault(require("../utils/createSignatureAttachment"));
var setup_1 = __importDefault(require("../utils/setup"));
var storeStatementsInService_1 = __importDefault(require("../utils/storeStatementsInService"));
var BASE_STATEMENT = {
    version: '1.0.0',
    actor: {
        mbox: 'mailto:example@example.com',
        name: 'Example Learner',
        objectType: 'Agent',
    },
    verb: {
        id: 'http://adlnet.gov/expapi/verbs/experienced',
        display: {
            'en-US': 'experienced',
        },
    },
    object: {
        id: 'https://www.youtube.com/watch?v=xh4kIiH3Sm8',
        objectType: 'Activity',
        definition: {
            name: {
                'en-US': 'Tax Tips & Information : How to File a Tax Return ',
            },
            description: {
                'en-US': 'Filing a tax return will require filling out either a 1040, 1040A or 1040EZ form',
            },
        },
    },
    timestamp: '2013-04-01T12:00:00Z',
};
var STATEMENT = __assign(__assign({}, BASE_STATEMENT), { id: '33cff416-e331-4c9d-969e-5373a1756120' });
// tslint:disable-next-line:max-line-length
var VALID_JWS = 'ew0KICAgICJhbGciOiAiUlMyNTYiLA0KICAgICJ4NWMiOiBbDQogICAgICAgICJNSUlEQVRDQ0FtcWdBd0lCQWdJSkFNQjFjc051QTYra01BMEdDU3FHU0liM0RRRUJCUVVBTUhFeEN6QUpCZ05WQkFZVEFsVlRNUkl3RUFZRFZRUUlFd2xVWlc1dVpYTnpaV1V4R0RBV0JnTlZCQW9URDBWNFlXMXdiR1VnUTI5dGNHRnVlVEVRTUE0R0ExVUVBeE1IUlhoaGJYQnNaVEVpTUNBR0NTcUdTSWIzRFFFSkFSWVRaWGhoYlhCc1pVQmxlR0Z0Y0d4bExtTnZiVEFlRncweE16QTBNRFF4TlRJNE16QmFGdzB4TkRBME1EUXhOVEk0TXpCYU1JR1dNUXN3Q1FZRFZRUUdFd0pWVXpFU01CQUdBMVVFQ0JNSlZHVnVibVZ6YzJWbE1SRXdEd1lEVlFRSEV3aEdjbUZ1YTJ4cGJqRVlNQllHQTFVRUNoTVBSWGhoYlhCc1pTQkRiMjF3WVc1NU1SQXdEZ1lEVlFRTEV3ZEZlR0Z0Y0d4bE1SQXdEZ1lEVlFRREV3ZEZlR0Z0Y0d4bE1TSXdJQVlKS29aSWh2Y05BUWtCRmhObGVHRnRjR3hsUUdWNFlXMXdiR1V1WTI5dE1JR2ZNQTBHQ1NxR1NJYjNEUUVCQVFVQUE0R05BRENCaVFLQmdRRGp4dlpYRjMwV0w0b0tqWllYZ1IwWnlhWCt1M3k2K0pxVHFpTmtGYS9WVG5ldDZMeTJPVDZabW1jSkVQbnEzVW5ld3BIb09RK0dmaGhUa1cxM2owNmo1aU5uNG9iY0NWV1RMOXlYTnZKSCtLbyt4dTRZbC95U1BScklQeVRqdEhkRzBNMlh6SWxtbUxxbStDQVMrS0NiSmVINHRmNTQza0lXQzVwQzVwM2NWUUlEQVFBQm8zc3dlVEFKQmdOVkhSTUVBakFBTUN3R0NXQ0dTQUdHK0VJQkRRUWZGaDFQY0dWdVUxTk1JRWRsYm1WeVlYUmxaQ0JEWlhKMGFXWnBZMkYwWlRBZEJnTlZIUTRFRmdRVVZzM3Y1YWZFZE9lb1llVmFqQVFFNHYwV1MxUXdId1lEVlIwakJCZ3dGb0FVeVZJYzN5dnJhNEVCejIwSTRCRjM5SUFpeEJrd0RRWUpLb1pJaHZjTkFRRUZCUUFEZ1lFQWdTL0ZGNUQwSG5qNDRydlQ2a2duM2tKQXZ2MmxqL2Z5anp0S0lyWVMzM2xqWEduNmdHeUE0cXRiWEEyM1ByTzR1Yy93WUNTRElDRHBQb2JoNjJ4VENkOXFPYktoZ3dXT2kwNVBTQkxxVXUzbXdmQWUxNUxKQkpCcVBWWjRLMGtwcGVQQlU4bTZhSVpvSDU3TC85dDRPb2FMOHlLcy9xaktGZUkxT0ZXWnh2QT0iLA0KICAgICAgICAiTUlJRE56Q0NBcUNnQXdJQkFnSUpBTUIxY3NOdUE2K2pNQTBHQ1NxR1NJYjNEUUVCQlFVQU1IRXhDekFKQmdOVkJBWVRBbFZUTVJJd0VBWURWUVFJRXdsVVpXNXVaWE56WldVeEdEQVdCZ05WQkFvVEQwVjRZVzF3YkdVZ1EyOXRjR0Z1ZVRFUU1BNEdBMVVFQXhNSFJYaGhiWEJzWlRFaU1DQUdDU3FHU0liM0RRRUpBUllUWlhoaGJYQnNaVUJsZUdGdGNHeGxMbU52YlRBZUZ3MHhNekEwTURReE5USTFOVE5hRncweU16QTBNREl4TlRJMU5UTmFNSEV4Q3pBSkJnTlZCQVlUQWxWVE1SSXdFQVlEVlFRSUV3bFVaVzV1WlhOelpXVXhHREFXQmdOVkJBb1REMFY0WVcxd2JHVWdRMjl0Y0dGdWVURVFNQTRHQTFVRUF4TUhSWGhoYlhCc1pURWlNQ0FHQ1NxR1NJYjNEUUVKQVJZVFpYaGhiWEJzWlVCbGVHRnRjR3hsTG1OdmJUQ0JuekFOQmdrcWhraUc5dzBCQVFFRkFBT0JqUUF3Z1lrQ2dZRUExc0JuQldQWjBmN1dKVUZUSnk1KzAxU2xTNVo2RERENlV5ZTl2SzlBeWNnVjVCMytXQzhIQzV1NWg5MU11akFDMUFSUFZVT3RzdlBSczQ1cUtORklnSUdSWEtQQXdaamF3RUkyc0NKUlNLVjQ3aTZCOGJEdjRXa3VHdlFhdmVaR0kwcWxtTjVSMUVpbTJnVUl0UmoxaGdjQzlyUWF2amxuRktEWTJybFhHdWtDQXdFQUFhT0IxakNCMHpBZEJnTlZIUTRFRmdRVXlWSWMzeXZyYTRFQnoyMEk0QkYzOUlBaXhCa3dnYU1HQTFVZEl3U0JtekNCbUlBVXlWSWMzeXZyYTRFQnoyMEk0QkYzOUlBaXhCbWhkYVJ6TUhFeEN6QUpCZ05WQkFZVEFsVlRNUkl3RUFZRFZRUUlFd2xVWlc1dVpYTnpaV1V4R0RBV0JnTlZCQW9URDBWNFlXMXdiR1VnUTI5dGNHRnVlVEVRTUE0R0ExVUVBeE1IUlhoaGJYQnNaVEVpTUNBR0NTcUdTSWIzRFFFSkFSWVRaWGhoYlhCc1pVQmxlR0Z0Y0d4bExtTnZiWUlKQU1CMWNzTnVBNitqTUF3R0ExVWRFd1FGTUFNQkFmOHdEUVlKS29aSWh2Y05BUUVGQlFBRGdZRUFEaHdUZWJHazczNXlLaG04RHFDeHZObkVaME54c1lFWU9qZ1JHMXlYVGxXNXBFNjkxZlNINUFaK1Q2ZnB3cFpjV1k1UVlrb042RG53ak94R2tTZlFDMy95R21jVURLQlB3aVo1TzJzOUMrZkUxa1VFbnJYMlhlYTRhZ1ZuZ016UjhEUTZvT2F1TFdxZWhEQitnMkVOV1JMb1ZnUyttYTUvWWNzMEdUeXJFQ1k9Ig0KICAgIF0NCn0.ew0KICAgICJ2ZXJzaW9uIjogIjEuMC4wIiwNCiAgICAiaWQiOiAiMzNjZmY0MTYtZTMzMS00YzlkLTk2OWUtNTM3M2ExNzU2MTIwIiwNCiAgICAiYWN0b3IiOiB7DQogICAgICAgICJtYm94IjogIm1haWx0bzpleGFtcGxlQGV4YW1wbGUuY29tIiwNCiAgICAgICAgIm5hbWUiOiAiRXhhbXBsZSBMZWFybmVyIiwNCiAgICAgICAgIm9iamVjdFR5cGUiOiAiQWdlbnQiDQogICAgfSwNCiAgICAidmVyYiI6IHsNCiAgICAgICAgImlkIjogImh0dHA6Ly9hZGxuZXQuZ292L2V4cGFwaS92ZXJicy9leHBlcmllbmNlZCIsDQogICAgICAgICJkaXNwbGF5Ijogew0KICAgICAgICAgICAgImVuLVVTIjogImV4cGVyaWVuY2VkIg0KICAgICAgICB9DQogICAgfSwNCiAgICAib2JqZWN0Ijogew0KICAgICAgICAiaWQiOiAiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g_dj14aDRrSWlIM1NtOCIsDQogICAgICAgICJvYmplY3RUeXBlIjogIkFjdGl2aXR5IiwNCiAgICAgICAgImRlZmluaXRpb24iOiB7DQogICAgICAgICAgICAibmFtZSI6IHsNCiAgICAgICAgICAgICAgICAiZW4tVVMiOiAiVGF4IFRpcHMgJiBJbmZvcm1hdGlvbiA6IEhvdyB0byBGaWxlIGEgVGF4IFJldHVybiAiDQogICAgICAgICAgICB9LA0KICAgICAgICAgICAgImRlc2NyaXB0aW9uIjogew0KICAgICAgICAgICAgICAgICJlbi1VUyI6ICJGaWxpbmcgYSB0YXggcmV0dXJuIHdpbGwgcmVxdWlyZSBmaWxsaW5nIG91dCBlaXRoZXIgYSAxMDQwLCAxMDQwQSBvciAxMDQwRVogZm9ybSINCiAgICAgICAgICAgIH0NCiAgICAgICAgfQ0KICAgIH0sDQogICAgInRpbWVzdGFtcCI6ICIyMDEzLTA0LTAxVDEyOjAwOjAwWiINCn0.FWuwaPhwUbkk7h9sKW5zSvjsYNugvxJ-TrVaEgt_DCUT0bmKhQScRrjMB6P9O50uznPwT66oF1NnU_G0HVhRzS5voiXE-y7tT3z0M3-8A6YK009Bk_digVUul-HA4Fpd5IjoBBGe3yzaQ2ZvzarvRuipvNEQCI0onpfuZZJQ0d8';
// tslint:disable-next-line:max-line-length
var NO_ID_JWS = 'eyJhbGciOiJSUzI1NiIsIng1YyI6WyJNSUlEQVRDQ0FtcWdBd0lCQWdJSkFNQjFjc051QTYra01BMEdDU3FHU0liM0RRRUJCUVVBTUhFeEN6QUpCZ05WQkFZVEFsVlRNUkl3RUFZRFZRUUlFd2xVWlc1dVpYTnpaV1V4R0RBV0JnTlZCQW9URDBWNFlXMXdiR1VnUTI5dGNHRnVlVEVRTUE0R0ExVUVBeE1IUlhoaGJYQnNaVEVpTUNBR0NTcUdTSWIzRFFFSkFSWVRaWGhoYlhCc1pVQmxlR0Z0Y0d4bExtTnZiVEFlRncweE16QTBNRFF4TlRJNE16QmFGdzB4TkRBME1EUXhOVEk0TXpCYU1JR1dNUXN3Q1FZRFZRUUdFd0pWVXpFU01CQUdBMVVFQ0JNSlZHVnVibVZ6YzJWbE1SRXdEd1lEVlFRSEV3aEdjbUZ1YTJ4cGJqRVlNQllHQTFVRUNoTVBSWGhoYlhCc1pTQkRiMjF3WVc1NU1SQXdEZ1lEVlFRTEV3ZEZlR0Z0Y0d4bE1SQXdEZ1lEVlFRREV3ZEZlR0Z0Y0d4bE1TSXdJQVlKS29aSWh2Y05BUWtCRmhObGVHRnRjR3hsUUdWNFlXMXdiR1V1WTI5dE1JR2ZNQTBHQ1NxR1NJYjNEUUVCQVFVQUE0R05BRENCaVFLQmdRRGp4dlpYRjMwV0w0b0tqWllYZ1IwWnlhWCt1M3k2K0pxVHFpTmtGYS9WVG5ldDZMeTJPVDZabW1jSkVQbnEzVW5ld3BIb09RK0dmaGhUa1cxM2owNmo1aU5uNG9iY0NWV1RMOXlYTnZKSCtLbyt4dTRZbC95U1BScklQeVRqdEhkRzBNMlh6SWxtbUxxbStDQVMrS0NiSmVINHRmNTQza0lXQzVwQzVwM2NWUUlEQVFBQm8zc3dlVEFKQmdOVkhSTUVBakFBTUN3R0NXQ0dTQUdHK0VJQkRRUWZGaDFQY0dWdVUxTk1JRWRsYm1WeVlYUmxaQ0JEWlhKMGFXWnBZMkYwWlRBZEJnTlZIUTRFRmdRVVZzM3Y1YWZFZE9lb1llVmFqQVFFNHYwV1MxUXdId1lEVlIwakJCZ3dGb0FVeVZJYzN5dnJhNEVCejIwSTRCRjM5SUFpeEJrd0RRWUpLb1pJaHZjTkFRRUZCUUFEZ1lFQWdTL0ZGNUQwSG5qNDRydlQ2a2duM2tKQXZ2MmxqL2Z5anp0S0lyWVMzM2xqWEduNmdHeUE0cXRiWEEyM1ByTzR1Yy93WUNTRElDRHBQb2JoNjJ4VENkOXFPYktoZ3dXT2kwNVBTQkxxVXUzbXdmQWUxNUxKQkpCcVBWWjRLMGtwcGVQQlU4bTZhSVpvSDU3TC85dDRPb2FMOHlLcy9xaktGZUkxT0ZXWnh2QT0iLCJNSUlETnpDQ0FxQ2dBd0lCQWdJSkFNQjFjc051QTYrak1BMEdDU3FHU0liM0RRRUJCUVVBTUhFeEN6QUpCZ05WQkFZVEFsVlRNUkl3RUFZRFZRUUlFd2xVWlc1dVpYTnpaV1V4R0RBV0JnTlZCQW9URDBWNFlXMXdiR1VnUTI5dGNHRnVlVEVRTUE0R0ExVUVBeE1IUlhoaGJYQnNaVEVpTUNBR0NTcUdTSWIzRFFFSkFSWVRaWGhoYlhCc1pVQmxlR0Z0Y0d4bExtTnZiVEFlRncweE16QTBNRFF4TlRJMU5UTmFGdzB5TXpBME1ESXhOVEkxTlROYU1IRXhDekFKQmdOVkJBWVRBbFZUTVJJd0VBWURWUVFJRXdsVVpXNXVaWE56WldVeEdEQVdCZ05WQkFvVEQwVjRZVzF3YkdVZ1EyOXRjR0Z1ZVRFUU1BNEdBMVVFQXhNSFJYaGhiWEJzWlRFaU1DQUdDU3FHU0liM0RRRUpBUllUWlhoaGJYQnNaVUJsZUdGdGNHeGxMbU52YlRDQm56QU5CZ2txaGtpRzl3MEJBUUVGQUFPQmpRQXdnWWtDZ1lFQTFzQm5CV1BaMGY3V0pVRlRKeTUrMDFTbFM1WjZEREQ2VXllOXZLOUF5Y2dWNUIzK1dDOEhDNXU1aDkxTXVqQUMxQVJQVlVPdHN2UFJzNDVxS05GSWdJR1JYS1BBd1pqYXdFSTJzQ0pSU0tWNDdpNkI4YkR2NFdrdUd2UWF2ZVpHSTBxbG1ONVIxRWltMmdVSXRSajFoZ2NDOXJRYXZqbG5GS0RZMnJsWEd1a0NBd0VBQWFPQjFqQ0IwekFkQmdOVkhRNEVGZ1FVeVZJYzN5dnJhNEVCejIwSTRCRjM5SUFpeEJrd2dhTUdBMVVkSXdTQm16Q0JtSUFVeVZJYzN5dnJhNEVCejIwSTRCRjM5SUFpeEJtaGRhUnpNSEV4Q3pBSkJnTlZCQVlUQWxWVE1SSXdFQVlEVlFRSUV3bFVaVzV1WlhOelpXVXhHREFXQmdOVkJBb1REMFY0WVcxd2JHVWdRMjl0Y0dGdWVURVFNQTRHQTFVRUF4TUhSWGhoYlhCc1pURWlNQ0FHQ1NxR1NJYjNEUUVKQVJZVFpYaGhiWEJzWlVCbGVHRnRjR3hsTG1OdmJZSUpBTUIxY3NOdUE2K2pNQXdHQTFVZEV3UUZNQU1CQWY4d0RRWUpLb1pJaHZjTkFRRUZCUUFEZ1lFQURod1RlYkdrNzM1eUtobThEcUN4dk5uRVowTnhzWUVZT2pnUkcxeVhUbFc1cEU2OTFmU0g1QVorVDZmcHdwWmNXWTVRWWtvTjZEbndqT3hHa1NmUUMzL3lHbWNVREtCUHdpWjVPMnM5QytmRTFrVUVuclgyWGVhNGFnVm5nTXpSOERRNm9PYXVMV3FlaERCK2cyRU5XUkxvVmdTK21hNS9ZY3MwR1R5ckVDWT0iXX0.eyJ2ZXJzaW9uIjoiMS4wLjAiLCJhY3RvciI6eyJtYm94IjoibWFpbHRvOmV4YW1wbGVAZXhhbXBsZS5jb20iLCJuYW1lIjoiRXhhbXBsZSBMZWFybmVyIiwib2JqZWN0VHlwZSI6IkFnZW50In0sInZlcmIiOnsiaWQiOiJodHRwOi8vYWRsbmV0Lmdvdi9leHBhcGkvdmVyYnMvZXhwZXJpZW5jZWQiLCJkaXNwbGF5Ijp7ImVuLVVTIjoiZXhwZXJpZW5jZWQifX0sIm9iamVjdCI6eyJpZCI6Imh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9eGg0a0lpSDNTbTgiLCJvYmplY3RUeXBlIjoiQWN0aXZpdHkiLCJkZWZpbml0aW9uIjp7Im5hbWUiOnsiZW4tVVMiOiJUYXggVGlwcyAmIEluZm9ybWF0aW9uIDogSG93IHRvIEZpbGUgYSBUYXggUmV0dXJuICJ9LCJkZXNjcmlwdGlvbiI6eyJlbi1VUyI6IkZpbGluZyBhIHRheCByZXR1cm4gd2lsbCByZXF1aXJlIGZpbGxpbmcgb3V0IGVpdGhlciBhIDEwNDAsIDEwNDBBIG9yIDEwNDBFWiBmb3JtIn19fSwidGltZXN0YW1wIjoiMjAxMy0wNC0wMVQxMjowMDowMFoifQ.d8fSmbq2XLKACDVdXnZKcLKfDBIKobXS3PBoFdi-WfmjIq33YTJG59LF1afH039APmH9dZ9fhQxREUhuFhIzqR7KPMlRsagm4IZJZbGBZgFjKpgTIMthSOwB6jwZPYjiFPDzOjw7sciSiVn8YVSKgPTOAIfoWx3NOEMhK6guqwE';
// tslint:disable-next-line:max-line-length
var VALID_JWS_WITH_ATTACHMENT = 'eyJhbGciOiJSUzI1NiIsIng1YyI6WyJNSUlEQVRDQ0FtcWdBd0lCQWdJSkFNQjFjc051QTYra01BMEdDU3FHU0liM0RRRUJCUVVBTUhFeEN6QUpCZ05WQkFZVEFsVlRNUkl3RUFZRFZRUUlFd2xVWlc1dVpYTnpaV1V4R0RBV0JnTlZCQW9URDBWNFlXMXdiR1VnUTI5dGNHRnVlVEVRTUE0R0ExVUVBeE1IUlhoaGJYQnNaVEVpTUNBR0NTcUdTSWIzRFFFSkFSWVRaWGhoYlhCc1pVQmxlR0Z0Y0d4bExtTnZiVEFlRncweE16QTBNRFF4TlRJNE16QmFGdzB4TkRBME1EUXhOVEk0TXpCYU1JR1dNUXN3Q1FZRFZRUUdFd0pWVXpFU01CQUdBMVVFQ0JNSlZHVnVibVZ6YzJWbE1SRXdEd1lEVlFRSEV3aEdjbUZ1YTJ4cGJqRVlNQllHQTFVRUNoTVBSWGhoYlhCc1pTQkRiMjF3WVc1NU1SQXdEZ1lEVlFRTEV3ZEZlR0Z0Y0d4bE1SQXdEZ1lEVlFRREV3ZEZlR0Z0Y0d4bE1TSXdJQVlKS29aSWh2Y05BUWtCRmhObGVHRnRjR3hsUUdWNFlXMXdiR1V1WTI5dE1JR2ZNQTBHQ1NxR1NJYjNEUUVCQVFVQUE0R05BRENCaVFLQmdRRGp4dlpYRjMwV0w0b0tqWllYZ1IwWnlhWCt1M3k2K0pxVHFpTmtGYS9WVG5ldDZMeTJPVDZabW1jSkVQbnEzVW5ld3BIb09RK0dmaGhUa1cxM2owNmo1aU5uNG9iY0NWV1RMOXlYTnZKSCtLbyt4dTRZbC95U1BScklQeVRqdEhkRzBNMlh6SWxtbUxxbStDQVMrS0NiSmVINHRmNTQza0lXQzVwQzVwM2NWUUlEQVFBQm8zc3dlVEFKQmdOVkhSTUVBakFBTUN3R0NXQ0dTQUdHK0VJQkRRUWZGaDFQY0dWdVUxTk1JRWRsYm1WeVlYUmxaQ0JEWlhKMGFXWnBZMkYwWlRBZEJnTlZIUTRFRmdRVVZzM3Y1YWZFZE9lb1llVmFqQVFFNHYwV1MxUXdId1lEVlIwakJCZ3dGb0FVeVZJYzN5dnJhNEVCejIwSTRCRjM5SUFpeEJrd0RRWUpLb1pJaHZjTkFRRUZCUUFEZ1lFQWdTL0ZGNUQwSG5qNDRydlQ2a2duM2tKQXZ2MmxqL2Z5anp0S0lyWVMzM2xqWEduNmdHeUE0cXRiWEEyM1ByTzR1Yy93WUNTRElDRHBQb2JoNjJ4VENkOXFPYktoZ3dXT2kwNVBTQkxxVXUzbXdmQWUxNUxKQkpCcVBWWjRLMGtwcGVQQlU4bTZhSVpvSDU3TC85dDRPb2FMOHlLcy9xaktGZUkxT0ZXWnh2QT0iLCJNSUlETnpDQ0FxQ2dBd0lCQWdJSkFNQjFjc051QTYrak1BMEdDU3FHU0liM0RRRUJCUVVBTUhFeEN6QUpCZ05WQkFZVEFsVlRNUkl3RUFZRFZRUUlFd2xVWlc1dVpYTnpaV1V4R0RBV0JnTlZCQW9URDBWNFlXMXdiR1VnUTI5dGNHRnVlVEVRTUE0R0ExVUVBeE1IUlhoaGJYQnNaVEVpTUNBR0NTcUdTSWIzRFFFSkFSWVRaWGhoYlhCc1pVQmxlR0Z0Y0d4bExtTnZiVEFlRncweE16QTBNRFF4TlRJMU5UTmFGdzB5TXpBME1ESXhOVEkxTlROYU1IRXhDekFKQmdOVkJBWVRBbFZUTVJJd0VBWURWUVFJRXdsVVpXNXVaWE56WldVeEdEQVdCZ05WQkFvVEQwVjRZVzF3YkdVZ1EyOXRjR0Z1ZVRFUU1BNEdBMVVFQXhNSFJYaGhiWEJzWlRFaU1DQUdDU3FHU0liM0RRRUpBUllUWlhoaGJYQnNaVUJsZUdGdGNHeGxMbU52YlRDQm56QU5CZ2txaGtpRzl3MEJBUUVGQUFPQmpRQXdnWWtDZ1lFQTFzQm5CV1BaMGY3V0pVRlRKeTUrMDFTbFM1WjZEREQ2VXllOXZLOUF5Y2dWNUIzK1dDOEhDNXU1aDkxTXVqQUMxQVJQVlVPdHN2UFJzNDVxS05GSWdJR1JYS1BBd1pqYXdFSTJzQ0pSU0tWNDdpNkI4YkR2NFdrdUd2UWF2ZVpHSTBxbG1ONVIxRWltMmdVSXRSajFoZ2NDOXJRYXZqbG5GS0RZMnJsWEd1a0NBd0VBQWFPQjFqQ0IwekFkQmdOVkhRNEVGZ1FVeVZJYzN5dnJhNEVCejIwSTRCRjM5SUFpeEJrd2dhTUdBMVVkSXdTQm16Q0JtSUFVeVZJYzN5dnJhNEVCejIwSTRCRjM5SUFpeEJtaGRhUnpNSEV4Q3pBSkJnTlZCQVlUQWxWVE1SSXdFQVlEVlFRSUV3bFVaVzV1WlhOelpXVXhHREFXQmdOVkJBb1REMFY0WVcxd2JHVWdRMjl0Y0dGdWVURVFNQTRHQTFVRUF4TUhSWGhoYlhCc1pURWlNQ0FHQ1NxR1NJYjNEUUVKQVJZVFpYaGhiWEJzWlVCbGVHRnRjR3hsTG1OdmJZSUpBTUIxY3NOdUE2K2pNQXdHQTFVZEV3UUZNQU1CQWY4d0RRWUpLb1pJaHZjTkFRRUZCUUFEZ1lFQURod1RlYkdrNzM1eUtobThEcUN4dk5uRVowTnhzWUVZT2pnUkcxeVhUbFc1cEU2OTFmU0g1QVorVDZmcHdwWmNXWTVRWWtvTjZEbndqT3hHa1NmUUMzL3lHbWNVREtCUHdpWjVPMnM5QytmRTFrVUVuclgyWGVhNGFnVm5nTXpSOERRNm9PYXVMV3FlaERCK2cyRU5XUkxvVmdTK21hNS9ZY3MwR1R5ckVDWT0iXX0.eyJ2ZXJzaW9uIjoiMS4wLjAiLCJpZCI6IjMzY2ZmNDE2LWUzMzEtNGM5ZC05NjllLTUzNzNhMTc1NjEyMCIsImFjdG9yIjp7Im1ib3giOiJtYWlsdG86ZXhhbXBsZUBleGFtcGxlLmNvbSIsIm5hbWUiOiJFeGFtcGxlIExlYXJuZXIiLCJvYmplY3RUeXBlIjoiQWdlbnQifSwidmVyYiI6eyJpZCI6Imh0dHA6Ly9hZGxuZXQuZ292L2V4cGFwaS92ZXJicy9leHBlcmllbmNlZCIsImRpc3BsYXkiOnsiZW4tVVMiOiJleHBlcmllbmNlZCJ9fSwib2JqZWN0Ijp7ImlkIjoiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g_dj14aDRrSWlIM1NtOCIsIm9iamVjdFR5cGUiOiJBY3Rpdml0eSIsImRlZmluaXRpb24iOnsibmFtZSI6eyJlbi1VUyI6IlRheCBUaXBzICYgSW5mb3JtYXRpb24gOiBIb3cgdG8gRmlsZSBhIFRheCBSZXR1cm4gIn0sImRlc2NyaXB0aW9uIjp7ImVuLVVTIjoiRmlsaW5nIGEgdGF4IHJldHVybiB3aWxsIHJlcXVpcmUgZmlsbGluZyBvdXQgZWl0aGVyIGEgMTA0MCwgMTA0MEEgb3IgMTA0MEVaIGZvcm0ifX19LCJhdHRhY2htZW50cyI6W3sidXNhZ2VUeXBlIjoiaHR0cDovL3d3dy5leGFtcGxlLmNvbSIsImRpc3BsYXkiOnt9LCJjb250ZW50VHlwZSI6InRleHQvcGxhaW4iLCJsZW5ndGgiOjAsInNoYTIiOiI2ZTIwMDgzODQzODVjOWMyMTYwOTRmMjJkNzMzNDcxMzJjZDg0NjI0MTY3MzU4OTcyZmVkMzAwZjYwNDc3MGQyIn1dLCJ0aW1lc3RhbXAiOiIyMDEzLTA0LTAxVDEyOjAwOjAwWiJ9.gmoB7qe9uksQmFYePqyDsDcPm--1DmCFsvMkZ1fVujdVkm3FvGFKAhxJfhJYcvUHjUmhhFyFXZxpJ49JLOtcjxsRUbT0KaaYOdMfPwCimLqesqRdBVsv28iG_UEPrZQr4T01ty8eOORIUrI51_ruH6mVDNvlYI7HpDtwMyvVAO0';
// tslint:disable-next-line:max-line-length
var INVALID_ALG_JWS = 'eyJhbGciOiJIUzI1NiIsIng1YyI6WyJNSUlEQVRDQ0FtcWdBd0lCQWdJSkFNQjFjc051QTYra01BMEdDU3FHU0liM0RRRUJCUVVBTUhFeEN6QUpCZ05WQkFZVEFsVlRNUkl3RUFZRFZRUUlFd2xVWlc1dVpYTnpaV1V4R0RBV0JnTlZCQW9URDBWNFlXMXdiR1VnUTI5dGNHRnVlVEVRTUE0R0ExVUVBeE1IUlhoaGJYQnNaVEVpTUNBR0NTcUdTSWIzRFFFSkFSWVRaWGhoYlhCc1pVQmxlR0Z0Y0d4bExtTnZiVEFlRncweE16QTBNRFF4TlRJNE16QmFGdzB4TkRBME1EUXhOVEk0TXpCYU1JR1dNUXN3Q1FZRFZRUUdFd0pWVXpFU01CQUdBMVVFQ0JNSlZHVnVibVZ6YzJWbE1SRXdEd1lEVlFRSEV3aEdjbUZ1YTJ4cGJqRVlNQllHQTFVRUNoTVBSWGhoYlhCc1pTQkRiMjF3WVc1NU1SQXdEZ1lEVlFRTEV3ZEZlR0Z0Y0d4bE1SQXdEZ1lEVlFRREV3ZEZlR0Z0Y0d4bE1TSXdJQVlKS29aSWh2Y05BUWtCRmhObGVHRnRjR3hsUUdWNFlXMXdiR1V1WTI5dE1JR2ZNQTBHQ1NxR1NJYjNEUUVCQVFVQUE0R05BRENCaVFLQmdRRGp4dlpYRjMwV0w0b0tqWllYZ1IwWnlhWCt1M3k2K0pxVHFpTmtGYS9WVG5ldDZMeTJPVDZabW1jSkVQbnEzVW5ld3BIb09RK0dmaGhUa1cxM2owNmo1aU5uNG9iY0NWV1RMOXlYTnZKSCtLbyt4dTRZbC95U1BScklQeVRqdEhkRzBNMlh6SWxtbUxxbStDQVMrS0NiSmVINHRmNTQza0lXQzVwQzVwM2NWUUlEQVFBQm8zc3dlVEFKQmdOVkhSTUVBakFBTUN3R0NXQ0dTQUdHK0VJQkRRUWZGaDFQY0dWdVUxTk1JRWRsYm1WeVlYUmxaQ0JEWlhKMGFXWnBZMkYwWlRBZEJnTlZIUTRFRmdRVVZzM3Y1YWZFZE9lb1llVmFqQVFFNHYwV1MxUXdId1lEVlIwakJCZ3dGb0FVeVZJYzN5dnJhNEVCejIwSTRCRjM5SUFpeEJrd0RRWUpLb1pJaHZjTkFRRUZCUUFEZ1lFQWdTL0ZGNUQwSG5qNDRydlQ2a2duM2tKQXZ2MmxqL2Z5anp0S0lyWVMzM2xqWEduNmdHeUE0cXRiWEEyM1ByTzR1Yy93WUNTRElDRHBQb2JoNjJ4VENkOXFPYktoZ3dXT2kwNVBTQkxxVXUzbXdmQWUxNUxKQkpCcVBWWjRLMGtwcGVQQlU4bTZhSVpvSDU3TC85dDRPb2FMOHlLcy9xaktGZUkxT0ZXWnh2QT0iLCJNSUlETnpDQ0FxQ2dBd0lCQWdJSkFNQjFjc051QTYrak1BMEdDU3FHU0liM0RRRUJCUVVBTUhFeEN6QUpCZ05WQkFZVEFsVlRNUkl3RUFZRFZRUUlFd2xVWlc1dVpYTnpaV1V4R0RBV0JnTlZCQW9URDBWNFlXMXdiR1VnUTI5dGNHRnVlVEVRTUE0R0ExVUVBeE1IUlhoaGJYQnNaVEVpTUNBR0NTcUdTSWIzRFFFSkFSWVRaWGhoYlhCc1pVQmxlR0Z0Y0d4bExtTnZiVEFlRncweE16QTBNRFF4TlRJMU5UTmFGdzB5TXpBME1ESXhOVEkxTlROYU1IRXhDekFKQmdOVkJBWVRBbFZUTVJJd0VBWURWUVFJRXdsVVpXNXVaWE56WldVeEdEQVdCZ05WQkFvVEQwVjRZVzF3YkdVZ1EyOXRjR0Z1ZVRFUU1BNEdBMVVFQXhNSFJYaGhiWEJzWlRFaU1DQUdDU3FHU0liM0RRRUpBUllUWlhoaGJYQnNaVUJsZUdGdGNHeGxMbU52YlRDQm56QU5CZ2txaGtpRzl3MEJBUUVGQUFPQmpRQXdnWWtDZ1lFQTFzQm5CV1BaMGY3V0pVRlRKeTUrMDFTbFM1WjZEREQ2VXllOXZLOUF5Y2dWNUIzK1dDOEhDNXU1aDkxTXVqQUMxQVJQVlVPdHN2UFJzNDVxS05GSWdJR1JYS1BBd1pqYXdFSTJzQ0pSU0tWNDdpNkI4YkR2NFdrdUd2UWF2ZVpHSTBxbG1ONVIxRWltMmdVSXRSajFoZ2NDOXJRYXZqbG5GS0RZMnJsWEd1a0NBd0VBQWFPQjFqQ0IwekFkQmdOVkhRNEVGZ1FVeVZJYzN5dnJhNEVCejIwSTRCRjM5SUFpeEJrd2dhTUdBMVVkSXdTQm16Q0JtSUFVeVZJYzN5dnJhNEVCejIwSTRCRjM5SUFpeEJtaGRhUnpNSEV4Q3pBSkJnTlZCQVlUQWxWVE1SSXdFQVlEVlFRSUV3bFVaVzV1WlhOelpXVXhHREFXQmdOVkJBb1REMFY0WVcxd2JHVWdRMjl0Y0dGdWVURVFNQTRHQTFVRUF4TUhSWGhoYlhCc1pURWlNQ0FHQ1NxR1NJYjNEUUVKQVJZVFpYaGhiWEJzWlVCbGVHRnRjR3hsTG1OdmJZSUpBTUIxY3NOdUE2K2pNQXdHQTFVZEV3UUZNQU1CQWY4d0RRWUpLb1pJaHZjTkFRRUZCUUFEZ1lFQURod1RlYkdrNzM1eUtobThEcUN4dk5uRVowTnhzWUVZT2pnUkcxeVhUbFc1cEU2OTFmU0g1QVorVDZmcHdwWmNXWTVRWWtvTjZEbndqT3hHa1NmUUMzL3lHbWNVREtCUHdpWjVPMnM5QytmRTFrVUVuclgyWGVhNGFnVm5nTXpSOERRNm9PYXVMV3FlaERCK2cyRU5XUkxvVmdTK21hNS9ZY3MwR1R5ckVDWT0iXX0.eyJ2ZXJzaW9uIjoiMS4wLjAiLCJpZCI6IjMzY2ZmNDE2LWUzMzEtNGM5ZC05NjllLTUzNzNhMTc1NjEyMCIsImFjdG9yIjp7Im1ib3giOiJtYWlsdG86ZXhhbXBsZUBleGFtcGxlLmNvbSIsIm5hbWUiOiJFeGFtcGxlIExlYXJuZXIiLCJvYmplY3RUeXBlIjoiQWdlbnQifSwidmVyYiI6eyJpZCI6Imh0dHA6Ly9hZGxuZXQuZ292L2V4cGFwaS92ZXJicy9leHBlcmllbmNlZCIsImRpc3BsYXkiOnsiZW4tVVMiOiJleHBlcmllbmNlZCJ9fSwib2JqZWN0Ijp7ImlkIjoiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g_dj14aDRrSWlIM1NtOCIsIm9iamVjdFR5cGUiOiJBY3Rpdml0eSIsImRlZmluaXRpb24iOnsibmFtZSI6eyJlbi1VUyI6IlRheCBUaXBzICYgSW5mb3JtYXRpb24gOiBIb3cgdG8gRmlsZSBhIFRheCBSZXR1cm4gIn0sImRlc2NyaXB0aW9uIjp7ImVuLVVTIjoiRmlsaW5nIGEgdGF4IHJldHVybiB3aWxsIHJlcXVpcmUgZmlsbGluZyBvdXQgZWl0aGVyIGEgMTA0MCwgMTA0MEEgb3IgMTA0MEVaIGZvcm0ifX19LCJ0aW1lc3RhbXAiOiIyMDEzLTA0LTAxVDEyOjAwOjAwWiJ9.4E9eCoNHirrilH37dOnUhE2I0CIdjG811_qeEkdTp0G5JQI4qyU0n19oFXyWVVGv8_5KuYcFVwvQlGGz9QwuYAqY6EChxiMyHn4U53XjFXk_7_KgI8nA06pGmDaMYC-dmq1A_fyfhBaS8KFAKYUw5hVg7o6ao8ogAep4-sklfWE';
// tslint:disable-next-line:max-line-length
var INVALID_JSON_JWS = 'eyJhbGciOiJSUzI1NiJ9.eydhY3RvciI6eyJvYmplY3RUeXBlIjoiQWdlbnQiLCJuYW1lIjoieEFQSSBtYm94IiwibWJveCI6Im1haWx0bzp4YXBpQGFkbG5ldC5nb3YifSwidmVyYiI6eyJpZCI6Imh0dHA6Ly9hZGxuZXQuZ292L2V4cGFwaS92ZXJicy9hdHRlbmRlZCIsImRpc3BsYXkiOnsiZW4tR0IiOiJhdHRlbmRlZCIsImVuLVVTIjoiYXR0ZW5kZWQifX0sIm9iamVjdCI6eyJvYmplY3RUeXBlIjoiQWN0aXZpdHkiLCJpZCI6Imh0dHA6Ly93d3cuZXhhbXBsZS5jb20vbWVldGluZ3Mvb2NjdXJhbmNlcy8zNDUzNCJ9LCJpZCI6Ijc2MGNmZGYyLWEzOWQtNDU0Mi04MThmLTA0N2UyNmY2YThiNiJ9.HKBqsw67Znxo46o4KeDbAlgC5-44wDl9uLnB3NzPoHZ01kjwu-P1vZIIsnK6tPJlaRzSezBW-ohGDFdyYV-MpA5mEUbeFTqclArkX4Qox9iNwLFAp2859BRE598avrme25ASbPFdV9aifsHK3FCIoZl_RRTBnRB084mkvjhEDRthptQdpTDGNVdx9kcV_sYyrxHy72dPzNC-kIl_uO7WYgeYK4phfNhRuPQAvapQWuptcNp8DAGb-91A2A6vUkVcCicHRIuUPiUArNhE-0JjHNKlP7-oNHeU2CFr0-qIrf4pRmwCOtkc_TR5p73ZAoGx2rCfOG-QRFKjPTo2qa3dog';
// tslint:disable-next-line:max-line-length
var MALFORMED_X5C_JWS = 'eyJhbGciOiJSUzI1NiIsIng1YyI6WyJNSUlETnpDQ0FxQ2dBd0lCQWdJSkFNQjFjc051QTYrak1BMEdDU3FHU0liM0RRRUJCUVVBTUhFeEN6QUpCZ05WQkFZVEFsVlRNUkl3RUFZRFZRUUlFd2xVWlc1dVpYTnpaV1V4R0RBV0JnTlZCQW9URDBWNFlXMXdiR1VnUTI5dGNHRnVlVEVRTUE0R0ExVUVBeE1IUlhoaGJYQnNaVEVpTUNBR0NTcUdTSWIzRFFFSkFSWVRaWGhoYlhCc1pVQmxlR2xrc2RmamxoZkZ0Y0d4bExtTnZiVEFlRncweE16QTBNRFF4TlRJMU5UTmFGdzB5TXpBME1ESXhOVEkxTlROYU1IRXhDekFKQmdOVkJBWVRBbFZUTVJJd0VBWURWUVFJRXdsVVpXNXVaWE56WldVeEdEQVdCZ05WQkFvVEQwVjRZVzF3YkdVZ1EyOXRjR0Z1ZVRFUU1BNEdBMVVFQXhNSFJYaGhiWEJzWlRFaU1DQUdDU3FHU0liM0RRRUpBUllUWlhoaGJYQnNaVUJsZUdGdGNHeGxMbU52YlRDQm56QU5CZ2txaGtpRzl3MEJBUUVGQUFPQmpRQXdnWWtDZ1lFQTFzQm5CV1BaMGY3V0pVRlRKeTUrMDFTbFM1WjZEREQ2VXllOXZLOUF5Y2dWNUIzK1dDOEhDNXU1aDkxTXVqQUMxQVJQVlVPdHN2UFJzNDVxS05GSWdJR1JYS1BBd1pqYXdFSTJzQ0pSU0tWNDdpNkI4YkR2NFdrdUd2UWF2ZVpHSTBxbG1ONVIxRWltMmdVSXRSajFoZ2NDOXJRYXZqbG5GS0RZMnJsWEd1a0NBd0VBQWFPQjFqQ0IwekFkQmdOVkhRNEVGZ1FVeVZJYzN5dnJhNEVCejIwSTRCRjM5SUFpeEJrd2dhTUdBMVVkSXdTQm16Q0JtSUFVeVZJYzN5dnJhNEVCejIwSTRCRjM5SUFpeEJtaGRhUnpNSEV4Q3pBSkJnTlZCQVlUQWxWVE1SSXdFQVlEVlFRSUV3bFVaVzV1WlhOelpXVXhHREFXQmdOVkJBb1REMFY0WVcxd2JHVWdRMjl0Y0dGdWVURVFNQTRHQTFVRUF4TUhSWGhoYlhCc1pURWlNQ0FHQ1NxR1NJYjNEUUVKQVJZVFpYaGhiWEJzWlVCbGVHRnRjR3hsTG1OdmJZSUpBTUIxY3NOdUE2K2pNQXdHQTFVZEV3UUZNQU1CQWY4d0RRWUpLb1pJaHZjTkFRRUZCUUFEZ1lFQURod1RlYkdrNzM1eUtobThEcUN4dk5uRVowTnhzWUVZT2pnUkcxeVhUbFc1cEU2OTFmU0g1QVorVDZmcHdwWmNXWTVRWWtvTjZEbndqT3hHa1NmUUMzL3lHbWNVREtCUHdpWjVPMnM5QytmRTFrVUVuclgyWGVhNGFnVm5nTXpSOERRNm9PYXVMV3FlaERCK2cyRU5XUkxvVmdTK21hNS9ZY3MwR1R5ckVDWT0iXX0.eyJ2ZXJzaW9uIjoiMS4wLjAiLCJpZCI6IjMzY2ZmNDE2LWUzMzEtNGM5ZC05NjllLTUzNzNhMTc1NjEyMCIsImFjdG9yIjp7Im1ib3giOiJtYWlsdG86ZXhhbXBsZUBleGFtcGxlLmNvbSIsIm5hbWUiOiJFeGFtcGxlIExlYXJuZXIiLCJvYmplY3RUeXBlIjoiQWdlbnQifSwidmVyYiI6eyJpZCI6Imh0dHA6Ly9hZGxuZXQuZ292L2V4cGFwaS92ZXJicy9leHBlcmllbmNlZCIsImRpc3BsYXkiOnsiZW4tVVMiOiJleHBlcmllbmNlZCJ9fSwib2JqZWN0Ijp7ImlkIjoiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g_dj14aDRrSWlIM1NtOCIsIm9iamVjdFR5cGUiOiJBY3Rpdml0eSIsImRlZmluaXRpb24iOnsibmFtZSI6eyJlbi1VUyI6IlRheCBUaXBzICYgSW5mb3JtYXRpb24gOiBIb3cgdG8gRmlsZSBhIFRheCBSZXR1cm4gIn0sImRlc2NyaXB0aW9uIjp7ImVuLVVTIjoiRmlsaW5nIGEgdGF4IHJldHVybiB3aWxsIHJlcXVpcmUgZmlsbGluZyBvdXQgZWl0aGVyIGEgMTA0MCwgMTA0MEEgb3IgMTA0MEVaIGZvcm0ifX19LCJ0aW1lc3RhbXAiOiIyMDEzLTA0LTAxVDEyOjAwOjAwWiJ9.Y-pMJI0Lg4yyS8NYvY3zjTYVT-SIiYTU5m80KeGUy_o';
// tslint:disable-next-line:max-line-length
var NO_X5C_JWS = 'eyJhbGciOiJSUzI1NiJ9.eyJ2ZXJzaW9uIjoiMS4wLjAiLCJpZCI6IjMzY2ZmNDE2LWUzMzEtNGM5ZC05NjllLTUzNzNhMTc1NjEyMCIsImFjdG9yIjp7Im1ib3giOiJtYWlsdG86ZXhhbXBsZUBleGFtcGxlLmNvbSIsIm5hbWUiOiJFeGFtcGxlIExlYXJuZXIiLCJvYmplY3RUeXBlIjoiQWdlbnQifSwidmVyYiI6eyJpZCI6Imh0dHA6Ly9hZGxuZXQuZ292L2V4cGFwaS92ZXJicy9leHBlcmllbmNlZCIsImRpc3BsYXkiOnsiZW4tVVMiOiJleHBlcmllbmNlZCJ9fSwib2JqZWN0Ijp7ImlkIjoiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g_dj14aDRrSWlIM1NtOCIsIm9iamVjdFR5cGUiOiJBY3Rpdml0eSIsImRlZmluaXRpb24iOnsibmFtZSI6eyJlbi1VUyI6IlRheCBUaXBzICYgSW5mb3JtYXRpb24gOiBIb3cgdG8gRmlsZSBhIFRheCBSZXR1cm4gIn0sImRlc2NyaXB0aW9uIjp7ImVuLVVTIjoiRmlsaW5nIGEgdGF4IHJldHVybiB3aWxsIHJlcXVpcmUgZmlsbGluZyBvdXQgZWl0aGVyIGEgMTA0MCwgMTA0MEEgb3IgMTA0MEVaIGZvcm0ifX19LCJ0aW1lc3RhbXAiOiIyMDEzLTA0LTAxVDEyOjAwOjAwWiJ9.TC6HW1c7gcz6vodY5CShlYvRG0x0ySyuyn2Yc9CPWA4';
// tslint:disable-next-line:max-line-length
var EMPTY_X5C_JWS = 'eyJhbGciOiJSUzI1NiIsIng1YyI6W119.eyJ2ZXJzaW9uIjoiMS4wLjAiLCJpZCI6IjMzY2ZmNDE2LWUzMzEtNGM5ZC05NjllLTUzNzNhMTc1NjEyMCIsImFjdG9yIjp7Im1ib3giOiJtYWlsdG86ZXhhbXBsZUBleGFtcGxlLmNvbSIsIm5hbWUiOiJFeGFtcGxlIExlYXJuZXIiLCJvYmplY3RUeXBlIjoiQWdlbnQifSwidmVyYiI6eyJpZCI6Imh0dHA6Ly9hZGxuZXQuZ292L2V4cGFwaS92ZXJicy9leHBlcmllbmNlZCIsImRpc3BsYXkiOnsiZW4tVVMiOiJleHBlcmllbmNlZCJ9fSwib2JqZWN0Ijp7ImlkIjoiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g_dj14aDRrSWlIM1NtOCIsIm9iamVjdFR5cGUiOiJBY3Rpdml0eSIsImRlZmluaXRpb24iOnsibmFtZSI6eyJlbi1VUyI6IlRheCBUaXBzICYgSW5mb3JtYXRpb24gOiBIb3cgdG8gRmlsZSBhIFRheCBSZXR1cm4gIn0sImRlc2NyaXB0aW9uIjp7ImVuLVVTIjoiRmlsaW5nIGEgdGF4IHJldHVybiB3aWxsIHJlcXVpcmUgZmlsbGluZyBvdXQgZWl0aGVyIGEgMTA0MCwgMTA0MEEgb3IgMTA0MEVaIGZvcm0ifX19LCJ0aW1lc3RhbXAiOiIyMDEzLTA0LTAxVDEyOjAwOjAwWiJ9.-t3A6NP4xAv9uf2UKMMN3Vew1HM6JwOoyMHTNhQbA_M';
// tslint:disable-next-line:max-line-length
var INVALID_X5C_TYPE = 'eyJhbGciOiJSUzI1NiIsIng1YyI6MTB9.eyJ2ZXJzaW9uIjoiMS4wLjAiLCJpZCI6IjMzY2ZmNDE2LWUzMzEtNGM5ZC05NjllLTUzNzNhMTc1NjEyMCIsImFjdG9yIjp7Im1ib3giOiJtYWlsdG86ZXhhbXBsZUBleGFtcGxlLmNvbSIsIm5hbWUiOiJFeGFtcGxlIExlYXJuZXIiLCJvYmplY3RUeXBlIjoiQWdlbnQifSwidmVyYiI6eyJpZCI6Imh0dHA6Ly9hZGxuZXQuZ292L2V4cGFwaS92ZXJicy9leHBlcmllbmNlZCIsImRpc3BsYXkiOnsiZW4tVVMiOiJleHBlcmllbmNlZCJ9fSwib2JqZWN0Ijp7ImlkIjoiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g_dj14aDRrSWlIM1NtOCIsIm9iamVjdFR5cGUiOiJBY3Rpdml0eSIsImRlZmluaXRpb24iOnsibmFtZSI6eyJlbi1VUyI6IlRheCBUaXBzICYgSW5mb3JtYXRpb24gOiBIb3cgdG8gRmlsZSBhIFRheCBSZXR1cm4gIn0sImRlc2NyaXB0aW9uIjp7ImVuLVVTIjoiRmlsaW5nIGEgdGF4IHJldHVybiB3aWxsIHJlcXVpcmUgZmlsbGluZyBvdXQgZWl0aGVyIGEgMTA0MCwgMTA0MEEgb3IgMTA0MEVaIGZvcm0ifX19LCJ0aW1lc3RhbXAiOiIyMDEzLTA0LTAxVDEyOjAwOjAwWiJ9.mULbjy6E3T72a8H3cOd0H4l4B-sWEcoSo2-JjeQrmF4dI2g0iXHo_-46qTWz4AtbS1Yxi4hSEqBvbAqg2sqZ91-42FC1N8XoarV9Nnymoi_KE3BESRCqpv6aBZRND1aIkivixdJWkqFIZKG-6jpZeblo1fJ0zv2GdsnczteYIW0';
describe('store statements with signed attachments', function () {
    var service = setup_1.default();
    var storeStatements = storeStatementsInService_1.default(service);
    it('should store the signed attachment when it is valid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var attachmentModel, attachment, testStatement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    attachmentModel = createAttachmentModel_1.default(VALID_JWS);
                    attachment = createSignatureAttachment_1.default(VALID_JWS);
                    testStatement = __assign(__assign({}, STATEMENT), { attachments: [attachment] });
                    return [4 /*yield*/, storeStatements([testStatement], [attachmentModel])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should store the signed attachment when it is valid with other attachments', function () { return __awaiter(void 0, void 0, void 0, function () {
        var jwsAttachmentModel, jwsAttachment, otherContent, otherAttachmentModel, otherAttachment, testStatement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jwsAttachmentModel = createAttachmentModel_1.default(VALID_JWS_WITH_ATTACHMENT);
                    jwsAttachment = createSignatureAttachment_1.default(VALID_JWS_WITH_ATTACHMENT);
                    otherContent = 'A';
                    otherAttachmentModel = createAttachmentModel_1.default(otherContent);
                    otherAttachment = createAttachment_1.default(otherContent);
                    testStatement = __assign(__assign({}, STATEMENT), { attachments: [jwsAttachment, otherAttachment] });
                    return [4 /*yield*/, storeStatements([testStatement], [jwsAttachmentModel, otherAttachmentModel])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should store the signed attachment when the signed statement misses id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var attachmentModel, attachment, testStatement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    attachmentModel = createAttachmentModel_1.default(NO_ID_JWS);
                    attachment = createSignatureAttachment_1.default(NO_ID_JWS);
                    testStatement = __assign(__assign({}, BASE_STATEMENT), { attachments: [attachment] });
                    return [4 /*yield*/, storeStatements([testStatement], [attachmentModel])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw an error when the signed statement is different', function () { return __awaiter(void 0, void 0, void 0, function () {
        var attachmentModel, attachment, testStatement, promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    attachmentModel = createAttachmentModel_1.default(VALID_JWS);
                    attachment = createSignatureAttachment_1.default(VALID_JWS);
                    testStatement = __assign(__assign({}, STATEMENT), { attachments: [attachment], verb: {
                            id: 'http://www.example.org/invalid_signed_verb_id',
                        } });
                    promise = storeStatements([testStatement], [attachmentModel]);
                    return [4 /*yield*/, assertError_1.default(InvalidSignedStatement_1.default, promise)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw an error when the signed attachment has an invalid public key', function () { return __awaiter(void 0, void 0, void 0, function () {
        var attachmentModel, attachment, testStatement, promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    attachmentModel = createAttachmentModel_1.default(MALFORMED_X5C_JWS);
                    attachment = createSignatureAttachment_1.default(MALFORMED_X5C_JWS);
                    testStatement = createAttachmentStatement_1.default([attachment]);
                    promise = storeStatements([testStatement], [attachmentModel]);
                    return [4 /*yield*/, assertError_1.default(InvalidJws_1.default, promise)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw an error when the signed attachment has an empty x5c', function () { return __awaiter(void 0, void 0, void 0, function () {
        var attachmentModel, attachment, testStatement, promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    attachmentModel = createAttachmentModel_1.default(EMPTY_X5C_JWS);
                    attachment = createSignatureAttachment_1.default(EMPTY_X5C_JWS);
                    testStatement = createAttachmentStatement_1.default([attachment]);
                    promise = storeStatements([testStatement], [attachmentModel]);
                    return [4 /*yield*/, assertError_1.default(InvalidX5CChain_1.default, promise)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw an error when the x5c is an invalid type', function () { return __awaiter(void 0, void 0, void 0, function () {
        var attachmentModel, attachment, testStatement, promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    attachmentModel = createAttachmentModel_1.default(INVALID_X5C_TYPE);
                    attachment = createSignatureAttachment_1.default(INVALID_X5C_TYPE);
                    testStatement = createAttachmentStatement_1.default([attachment]);
                    promise = storeStatements([testStatement], [attachmentModel]);
                    return [4 /*yield*/, assertError_1.default(InvalidX5CType_1.default, promise)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should store the signed attachment when the signed attachment has no x5c', function () { return __awaiter(void 0, void 0, void 0, function () {
        var attachmentModel, attachment, testStatement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    attachmentModel = createAttachmentModel_1.default(NO_X5C_JWS);
                    attachment = createSignatureAttachment_1.default(NO_X5C_JWS);
                    testStatement = __assign(__assign({}, STATEMENT), { attachments: [attachment] });
                    return [4 /*yield*/, storeStatements([testStatement], [attachmentModel])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw an error when the signed attachment has invalid json', function () { return __awaiter(void 0, void 0, void 0, function () {
        var attachmentModel, attachment, testStatement, promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    attachmentModel = createAttachmentModel_1.default(INVALID_JSON_JWS);
                    attachment = createSignatureAttachment_1.default(INVALID_JSON_JWS);
                    testStatement = createAttachmentStatement_1.default([attachment]);
                    promise = storeStatements([testStatement], [attachmentModel]);
                    return [4 /*yield*/, assertError_1.default(JsonSyntaxError_1.default, promise)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw an error when the signed attachment has an invalid algorithm', function () { return __awaiter(void 0, void 0, void 0, function () {
        var attachmentModel, attachment, testStatement, promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    attachmentModel = createAttachmentModel_1.default(INVALID_ALG_JWS);
                    attachment = createSignatureAttachment_1.default(INVALID_ALG_JWS);
                    testStatement = createAttachmentStatement_1.default([attachment]);
                    promise = storeStatements([testStatement], [attachmentModel]);
                    return [4 /*yield*/, assertError_1.default(InvalidSignatureAlgorithm_1.default, promise)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    // tslint:disable-next-line:max-file-line-count
});
