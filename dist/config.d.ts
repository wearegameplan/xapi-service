import { S3 } from 'aws-sdk';
declare const _default: {
    defaultTimeout: number;
    express: {
        allowFormBody: boolean;
        allowUndefinedMethod: boolean;
        bodyParserLimit: string;
        morganDirectory: string;
        port: number;
        xAPIPrefix: string;
    };
    fetchAuthRepo: {
        llClientInfoEndpoint: string;
    };
    azureStorageRepo: {
        account: string;
        accountKey: string;
        containerName: string;
        subFolder: string;
    };
    googleStorageRepo: {
        bucketName: string;
        keyFileName: string;
        projectId: string;
        subFolder: string;
    };
    lang: string;
    localStorageRepo: {
        storageDir: string;
    };
    mongoModelsRepo: {
        dbName: string;
        url: string;
    };
    redis: {
        prefix: string;
        url: string;
    };
    repoFactory: {
        authRepoName: string;
        eventsRepoName: string;
        modelsRepoName: string;
        storageRepoName: string;
    };
    s3StorageRepo: {
        awsConfig: S3.ClientConfiguration;
        bucketName: string;
    };
    sentinel: {
        db: number;
        name: string;
        password: string;
        prefix: string;
        sentinels: {
            host: string;
            port: number;
        }[];
    };
    statementsService: {
        awaitUpdates: boolean;
        enableActorLowerCasing: boolean;
        enableActivityUpdates: boolean;
        enableAttachmentCreation: boolean;
        enableAttachmentValidation: boolean;
        enableConflictChecks: boolean;
        enableNullRemoval: boolean;
        enableReferencing: boolean;
        enableStatementCreation: boolean;
        enableVoiding: boolean;
        enableVoidingChecks: boolean;
    };
    storageSubFolders: {
        activities: string;
        agents: string;
        state: string;
        statements: string;
    };
    tracker: {
        newRelic: {
            enabled: boolean;
            log: string;
            logLevel: string;
            noConfigFile: string;
        };
    };
    winston: {
        cloudWatch: {
            awsConfig: {
                accessKeyId: string;
                region: string;
                secretAccessKey: string;
            };
            enabled: boolean;
            level: string;
            logGroupName: string;
            logStreamName: string;
        };
        console: {
            level: string;
        };
    };
};
export default _default;
