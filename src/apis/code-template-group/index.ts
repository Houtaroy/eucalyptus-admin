import { defHttp } from '/@/utils/http/axios';
import { PageableObject } from '/@/apis/models/PageableObject';
import { PageCodeTemplateGroupEntity } from './models/PageCodeTemplateGroupEntity';
import { CodeTemplateGroupEntity } from './models/CodeTemplateGroupEntity';
import { GenerateRequestBody } from './models/GenerateRequestBody';
import { GeneratePreview } from './models/GeneratePreview';

export function listCodeTemplateGroups(params: PageableObject) {
  return defHttp.get<PageCodeTemplateGroupEntity>(
    { url: '/code-template-groups', params },
    { joinParamsToUrl: true },
  );
}

export function loadCodeTemplateGroupById(id: String) {
  return defHttp.get<CodeTemplateGroupEntity>({ url: `/code-template-groups/${id}` });
}

export function addCodeTemplateGroup(data: CodeTemplateGroupEntity) {
  return defHttp.post<CodeTemplateGroupEntity>({ url: '/code-template-groups', data });
}

export function updateCodeTemplateGroupById(id: String, data: CodeTemplateGroupEntity) {
  return defHttp.put<null>({ url: `/code-template-groups/${id}`, data });
}

export function deleteCodeTemplateGroupById(id: String) {
  return defHttp.delete<null>({ url: `/code-template-groups/${id}` }, { errorMessageMode: 'none' });
}

export function generatePreview(id: string, data: GenerateRequestBody) {
  return defHttp.post<GeneratePreview>({
    url: `/code-template-groups/${id}/generate-preview`,
    data,
  });
}

export function generateDownload(id: string, data: GenerateRequestBody) {
  return defHttp.post<string>({ url: `/code-template-groups/${id}/generate-download`, data });
}
