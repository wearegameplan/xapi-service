"use strict";
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
// tslint:disable:max-file-line-count
var dotenv_1 = require("dotenv");
dotenv_1.config();
var getBooleanOption_1 = __importDefault(require("jscommons/dist/config/getBooleanOption"));
var getNumberOption_1 = __importDefault(require("jscommons/dist/config/getNumberOption"));
var getStringOption_1 = __importDefault(require("jscommons/dist/config/getStringOption"));
var getDbFromUrl_1 = __importDefault(require("jscommons/dist/mongoRepo/utils/getDbFromUrl"));
var lodash_1 = require("lodash");
var os = __importStar(require("os"));
var DEFAULT_REDIS_PORT = 6379;
var DEFAULT_EXPRESS_PORT = 8081;
var DEFAULT_TIMEOUT_MS = 300000; // 5 minutes.
var storageDir = process.cwd() + "/storage";
var googleKeyFileName = process.cwd() + "/google.keyfile.json";
var expressPort = getNumberOption_1.default(lodash_1.defaultTo(process.env.EXPRESS_PORT, process.env.PORT), DEFAULT_EXPRESS_PORT);
var demoAuth = "http://localhost:" + expressPort + "/auth";
var accessLogsDir = storageDir + "/accessLogs";
var newRelicLogsDir = storageDir + "/newrelic-agent.log";
var newRelicLicenseKey = getStringOption_1.default(process.env.NEW_RELIC_LICENSE_KEY, '');
var defaultMongoUrl = 'mongodb://localhost:27017/learninglocker_v2';
var mongoUrl = getStringOption_1.default(process.env.MONGO_URL, defaultMongoUrl);
exports.default = {
    defaultTimeout: getNumberOption_1.default(process.env.DEFAULT_TIMEOUT_MS, DEFAULT_TIMEOUT_MS),
    express: {
        allowFormBody: getBooleanOption_1.default(process.env.EXPRESS_ALLOW_FORM_BODY, false),
        allowUndefinedMethod: getBooleanOption_1.default(process.env.EXPRESS_ALLOW_UNDEFINED_METHOD, false),
        bodyParserLimit: getStringOption_1.default(process.env.EXPRESS_BODY_PARSER_LIMIT, '5mb'),
        morganDirectory: getStringOption_1.default(process.env.EXPRESS_MORGAN_DIRECTORY, accessLogsDir),
        port: expressPort,
        xAPIPrefix: getStringOption_1.default(process.env.XAPI_PREFIX, '/data'),
    },
    fetchAuthRepo: {
        llClientInfoEndpoint: getStringOption_1.default(process.env.LL_CLIENT_INFO_ENDPOINT, demoAuth),
    },
    azureStorageRepo: {
        account: getStringOption_1.default(process.env.FS_AZURE_ACCOUNT),
        accountKey: getStringOption_1.default(process.env.FS_AZURE_ACCOUNT_KEY),
        containerName: getStringOption_1.default(process.env.FS_AZURE_CONTAINER_NAME, 'll'),
        subFolder: getStringOption_1.default(process.env.FS_AZURE_CONTAINER_SUBFOLDER, 'storage'),
    },
    googleStorageRepo: {
        bucketName: getStringOption_1.default(process.env.FS_GOOGLE_CLOUD_BUCKET, 'xapi-server'),
        keyFileName: getStringOption_1.default(process.env.FS_GOOGLE_CLOUD_KEY_FILENAME, googleKeyFileName),
        projectId: getStringOption_1.default(process.env.FS_GOOGLE_CLOUD_PROJECT_ID, 'll'),
        subFolder: getStringOption_1.default(process.env.FS_GOOGLE_CLOUD_BUCKET_SUBFOLDER, 'storage'),
    },
    lang: getStringOption_1.default(process.env.LANG, 'en'),
    localStorageRepo: {
        storageDir: getStringOption_1.default(process.env.FS_LOCAL_STORAGE_DIR, storageDir),
    },
    mongoModelsRepo: {
        dbName: getStringOption_1.default(process.env.MONGO_DB, getDbFromUrl_1.default(mongoUrl)),
        url: mongoUrl,
    },
    redis: {
        prefix: getStringOption_1.default(process.env.REDIS_PREFIX, 'LEARNINGLOCKER'),
        url: getStringOption_1.default(process.env.REDIS_URL, 'redis://127.0.0.1:6379/0'),
    },
    repoFactory: {
        authRepoName: getStringOption_1.default(process.env.AUTH_REPO, 'mongo'),
        eventsRepoName: getStringOption_1.default(process.env.EVENTS_REPO, 'redis'),
        modelsRepoName: getStringOption_1.default(process.env.MODELS_REPO, 'mongo'),
        storageRepoName: getStringOption_1.default(process.env.STORAGE_REPO, 'local'),
    },
    s3StorageRepo: {
        awsConfig: {
            accessKeyId: getStringOption_1.default(process.env.FS_S3_ACCESS_KEY_ID),
            apiVersion: '2006-03-01',
            region: getStringOption_1.default(process.env.FS_S3_REGION),
            secretAccessKey: getStringOption_1.default(process.env.FS_S3_SECRET_ACCESS_KEY),
            signatureVersion: 'v4',
            sslEnabled: true,
        },
        bucketName: getStringOption_1.default(process.env.FS_S3_BUCKET, 'xapi-service'),
    },
    sentinel: {
        db: getNumberOption_1.default(process.env.SENTINEL_DB, 0),
        name: getStringOption_1.default(process.env.SENTINEL_NAME, 'mymaster'),
        password: getStringOption_1.default(process.env.SENTINEL_PASSWORD),
        prefix: getStringOption_1.default(process.env.SENTINEL_PREFIX, 'LEARNINGLOCKER'),
        sentinels: (getStringOption_1.default(process.env.SENTINEL_CONNECTIONS, '127.0.0.1:6379').split(' ').map(function (conn) {
            var _a = conn.split(':'), host = _a[0], port = _a[1];
            return { host: host, port: getNumberOption_1.default(port, DEFAULT_REDIS_PORT) };
        })),
    },
    statementsService: {
        awaitUpdates: getBooleanOption_1.default(lodash_1.defaultTo(process.env.SERVICE_AWAIT_UPDATES, process.env.SERVICE_AWAIT_UODATES), false),
        enableActorLowerCasing: getBooleanOption_1.default(process.env.STATEMENTS_SERVICE_LOWERCASE_ACTORS, false),
        enableActivityUpdates: getBooleanOption_1.default(process.env.STATEMENTS_SERVICE_UPDATE_ACTIVITIES),
        enableAttachmentCreation: getBooleanOption_1.default(process.env.STATEMENTS_SERVICE_CREATE_ATTACHMENTS),
        enableAttachmentValidation: getBooleanOption_1.default(process.env.STATEMENTS_SERVICE_CHECK_ATTACHMENTS),
        enableConflictChecks: getBooleanOption_1.default(process.env.STATEMENTS_SERVICE_CHECK_CONFLICTS),
        enableNullRemoval: getBooleanOption_1.default(process.env.SERVICE_REMOVE_NULLS, false),
        enableReferencing: getBooleanOption_1.default(process.env.STATEMENTS_SERVICE_UPDATE_REFS),
        enableStatementCreation: getBooleanOption_1.default(process.env.STATEMENTS_SERVICE_CREATE_STATEMENTS),
        enableVoiding: getBooleanOption_1.default(process.env.STATEMENTS_SERVICE_UPDATE_VOIDS),
        enableVoidingChecks: getBooleanOption_1.default(process.env.STATEMENTS_SERVICE_CHECK_VOIDS),
    },
    storageSubFolders: {
        activities: getStringOption_1.default(process.env.SUB_FOLDER_ACTIVITIES, '/activities'),
        agents: getStringOption_1.default(process.env.SUB_FOLDER_AGENTS, '/agents'),
        state: getStringOption_1.default(process.env.SUB_FOLDER_STATE, '/state'),
        statements: getStringOption_1.default(process.env.SUB_FOLDER_STATEMENTS, '/statements'),
    },
    tracker: {
        newRelic: {
            enabled: newRelicLicenseKey !== '',
            log: getStringOption_1.default(process.env.NEW_RELIC_LOG, newRelicLogsDir),
            logLevel: getStringOption_1.default(process.env.NEW_RELIC_LOG_LEVEL, 'info'),
            noConfigFile: getStringOption_1.default(process.env.NEW_RELIC_NO_CONFIG_FILE, 'true'),
        },
    },
    winston: {
        cloudWatch: {
            awsConfig: {
                accessKeyId: getStringOption_1.default(process.env.WINSTON_CLOUDWATCH_ACCESS_KEY_ID),
                region: getStringOption_1.default(process.env.WINSTON_CLOUDWATCH_REGION),
                secretAccessKey: getStringOption_1.default(process.env.WINSTON_CLOUDWATCH_SECRET_ACCESS_KEY),
            },
            enabled: getBooleanOption_1.default(process.env.WINSTON_CLOUDWATCH_ENABLED, false),
            level: getStringOption_1.default(process.env.WINSTON_CLOUDWATCH_LEVEL, 'info'),
            logGroupName: getStringOption_1.default(process.env.WINSTON_CLOUDWATCH_LOG_GROUP_NAME, 'xapi-service'),
            logStreamName: getStringOption_1.default(process.env.WINSTON_CLOUDWATCH_LOG_STREAM_NAME, os.hostname()),
        },
        console: {
            level: getStringOption_1.default(process.env.WINSTON_CONSOLE_LEVEL, 'info'),
        },
    },
};
