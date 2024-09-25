import ClientModel from '../../../../models/ClientModel';
import FacadeConfig from './FacadeConfig';
export interface Options {
    readonly config: FacadeConfig;
    readonly query: Object;
    readonly project: Object;
    readonly client: ClientModel;
}
declare const _default: ({ config, query, project, client }: Options) => Promise<any[]>;
export default _default;
