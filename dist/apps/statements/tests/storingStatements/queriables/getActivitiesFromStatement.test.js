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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var getActivitiesFromStatement_1 = require("../../../service/storeStatements/queriables/getActivitiesFromStatement");
var ACTIVITY_ID = 'http://example.org/test-activity';
var ACTIVITY_ID2 = 'http://example.org/test-activity2';
var ACTIVITY_ID3 = 'http://example.org/test-activity3';
var agent = {
    objectType: 'Agent',
    mbox: 'mailto:test@test.com',
};
var activity = {
    objectType: 'Activity',
    id: ACTIVITY_ID,
};
var statementDefaults = {
    id: 'testvalue',
    authority: agent,
    stored: 'testvalue',
    timestamp: 'testvalue',
    version: 'testvalue',
    actor: agent,
    object: activity,
    verb: {
        id: 'http://example.org/verb',
    },
};
var activity2 = {
    objectType: 'Activity',
    id: ACTIVITY_ID2,
};
var activity3 = {
    objectType: 'Activity',
    id: ACTIVITY_ID3,
};
var agentObjectModel = __assign(__assign({}, statementDefaults), { object: agent });
var activityObjectmodel = __assign(__assign({}, statementDefaults), { object: activity, context: {
        contextActivities: {
            parent: [
                activity,
            ],
            grouping: [
                activity,
                activity2,
            ],
            category: [],
        },
    } });
var subStatementObjectmodel = __assign(__assign({}, statementDefaults), { object: {
        objectType: 'SubStatement',
        actor: agent,
        verb: {
            id: 'http://example.org/verb',
        },
        object: activity,
        context: activityObjectmodel.context,
    }, context: {
        contextActivities: {
            parent: [
                activity3,
            ],
            grouping: [],
            category: [],
            other: [],
        },
    } });
describe('create array of queriable activities', function () {
    it('should return the non related activities', function () {
        var activities = getActivitiesFromStatement_1.getActivitiesFromStatement(activityObjectmodel);
        assert_1.default.deepEqual(activities, [ACTIVITY_ID]);
    });
    it('should return the related activities', function () {
        var activities = getActivitiesFromStatement_1.getRelatedActivitiesFromStatement(activityObjectmodel);
        assert_1.default.deepEqual(activities, [ACTIVITY_ID, ACTIVITY_ID2]);
    });
    it('should return the related activities with a substatement', function () {
        var activities = getActivitiesFromStatement_1.getRelatedActivitiesFromStatement(subStatementObjectmodel);
        assert_1.default.deepEqual(activities, [ACTIVITY_ID3, ACTIVITY_ID, ACTIVITY_ID2]);
    });
    it('should return no related activities from an agent object statement', function () {
        var activities = getActivitiesFromStatement_1.getRelatedActivitiesFromStatement(agentObjectModel);
        assert_1.default.deepEqual(activities, []);
    });
    // tslint:disable-next-line:max-file-line-count
});
