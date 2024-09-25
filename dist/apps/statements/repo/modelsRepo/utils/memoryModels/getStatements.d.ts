import ClientModel from '../../../../models/ClientModel';
import Statement from '../../../../models/Statement';
import FacadeConfig from './FacadeConfig';
export interface Options<Result> {
    readonly config: FacadeConfig;
    readonly query: (model: Statement) => boolean;
    readonly project: (model: Statement) => Result;
    readonly client: ClientModel;
}
declare const _default: <Result>({ config, query, project, client }: Options<Result>) => Promise<Result[]>;
export default _default;
