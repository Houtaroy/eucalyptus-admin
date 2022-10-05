import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/low-code',
  name: 'LowCode',
  component: LAYOUT,
  redirect: '/low-code/generator',
  meta: {
    title: t('routes.lowCode.generator'),
    icon: 'ant-design:code-outlined',
  },
  children: [
    {
      path: 'generator',
      name: 'Generator',
      component: () => import('/@/views/low-code/generator/index.vue'),
      meta: {
        title: t('routes.lowCode.generator'),
        icon: 'ant-design:code-outlined',
      },
    },
    {
      path: 'code-template-group',
      name: 'CodeTemplateGroup',
      component: () => import('/@/views/low-code/code-template-group/index.vue'),
      meta: {
        title: t('routes.lowCode.codeTemplateGroup.list'),
        icon: 'ant-design:file-filled',
      },
    },
  ],
};

export default dashboard;
