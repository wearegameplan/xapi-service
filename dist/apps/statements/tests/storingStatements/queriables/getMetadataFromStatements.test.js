"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
// tslint:disable-next-line:import-spacing
var getMetadataFromStatement_1 = __importDefault(require("../../../service/storeStatements/queriables/getMetadataFromStatement"));
var VERB_ID = 'http://example.org/test-verb';
var statementDefaults = {
    id: 'testvalue',
    authority: {
        objectType: 'Agent',
        mbox: 'mailto:authority@test.com',
    },
    stored: 'testvalue',
    timestamp: 'testvalue',
    version: 'testvalue',
    actor: {
        objectType: 'Agent',
        mbox: 'mailto:actor@test.com',
    },
    verb: {
        id: VERB_ID,
    },
    object: {
        objectType: 'Activity',
        id: 'http://example.org/activity',
    },
    result: {
        duration: 'P1Y2M3DT4H5M6S',
    },
};
describe('create metadata with result duration', function () {
    it('should return result duration statement', function () {
        var metadata = getMetadataFromStatement_1.default(statementDefaults);
        assert_1.default.deepEqual(metadata, {
            'https://learninglocker&46;net/result-duration': { seconds: 37080306 },
        });
    });
});
