import { defHttp } from '/@/utils/http/axios';
import { PageableObject } from '/@/apis/models/PageableObject';
import { PageCodeTemplateGroupEntity } from './models/PageCodeTemplateGroupEntity';
import { CodeTemplateGroupEntity } from './models/CodeTemplateGroupEntity';

export function listCodeTemplateGroups(params: PageableObject) {
  return defHttp.get<PageCodeTemplateGroupEntity>(
    { url: '/code-template-groups', params },
    { errorMessageMode: 'none', joinParamsToUrl: true },
  );
}

export function loadCodeTemplateGroupById(id: String) {
  return defHttp.get<CodeTemplateGroupEntity>(
    { url: `/code-template-groups/${id}` },
    { errorMessageMode: 'none' },
  );
}

export function addCodeTemplateGroup(data: CodeTemplateGroupEntity) {
  return defHttp.post<CodeTemplateGroupEntity>(
    { url: '/code-template-groups', data },
    { errorMessageMode: 'none' },
  );
}

export function updateCodeTemplateGroupById(id: String, data: CodeTemplateGroupEntity) {
  return defHttp.put<null>(
    { url: `/code-template-groups/${id}`, data },
    { errorMessageMode: 'none' },
  );
}

export function deleteCodeTemplateGroupById(id: String) {
  return defHttp.delete<null>({ url: `/code-template-groups/${id}` }, { errorMessageMode: 'none' });
}
