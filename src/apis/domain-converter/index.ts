import { defHttp } from '/@/utils/http/axios';
import { DomainConverter } from './models/DomainConverter';

export function listDomainConverters() {
  return defHttp.get<DomainConverter[]>(
    { url: '/domain-converters' },
    { errorMessageMode: 'none' },
  );
}
