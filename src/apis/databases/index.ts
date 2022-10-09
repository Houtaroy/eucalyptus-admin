import { defHttp } from '/@/utils/http/axios';
import { TablesRequest } from './models/TablesRequest';
import { JdbcTable } from './models/JdbcTable';

export function listTables(data: TablesRequest) {
  return defHttp.post<JdbcTable[]>({ url: '/databases/tables', data });
}
