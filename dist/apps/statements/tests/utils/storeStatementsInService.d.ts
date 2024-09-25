import ClientModel from '../../models/ClientModel';
import Service from '../../serviceFactory/Service';
declare const _default: (service: Service) => (statements: any[], attachments?: any[], client?: ClientModel) => Promise<string[]>;
export default _default;
