import ClientModel from '../../models/ClientModel';
import UnstoredStatementModel from '../../models/UnstoredStatementModel';
import Config from '../Config';
declare const _default: (config: Config, statements: UnstoredStatementModel[], voidedObjectIds: string[], client: ClientModel) => Promise<void>;
export default _default;
