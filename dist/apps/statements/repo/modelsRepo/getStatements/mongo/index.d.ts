import StoredStatementModel from '../../../../models/StoredStatementModel';
import FacadeConfig from '../../utils/mongoModels/FacadeConfig';
import { Opts } from '../Signature';
declare const _default: (config: FacadeConfig) => import("jscommons/dist/utils/Member").default<Opts, StoredStatementModel[]>;
export default _default;
