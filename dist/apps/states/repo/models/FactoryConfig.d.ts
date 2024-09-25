import { Db } from 'mongodb';
import State from '../../models/State';
export default interface FactoryConfig {
    readonly factoryName: string;
    readonly mongo: {
        readonly db: () => Promise<Db>;
    };
    readonly memory: {
        readonly state: {
            states: State[];
        };
    };
}
