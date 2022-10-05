<script lang="ts" setup>
  import { ref, unref, computed } from 'vue';

  import { Tabs, TabPane } from 'ant-design-vue';

  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm } from '/@/components/Form';

  import { useCodeTemplateGroupBasicForm } from './CodeTemplateGroupBasicForm';
  import CodeTemplateGroupDomainConverterForm from './CodeTemplateGroupDomainConverterForm.vue';
  import CodeTemplateGroupPropertyTable from './CodeTemplateGroupPropertyTable.vue';
  import CodeTemplateGroupTemplatesForm from './CodeTemplateGroupTemplatesForm.vue';

  import { CodeTemplateGroupEntity } from '/@/apis/code-template-group/models/CodeTemplateGroupEntity';
  import { TemplateEntity } from '/@/apis/code-template-group/models/TemplateEntity';

  const isUpdate = ref(true);
  const getTitle = computed(() => (!unref(isUpdate) ? '新增代码模板组' : '编辑代码模板组'));
  const rowId = ref('');
  const activeKey = ref('basic');

  const [registerModal, { setModalProps }] = useModalInner(
    async (data: CodeTemplateGroupEntity) => {
      setModalProps({ confirmLoading: false, defaultFullscreen: true, canFullscreen: false });
      activeKey.value = 'basic';
      isUpdate.value = !!data?.id;

      if (unref(isUpdate)) {
        rowId.value = data.id!;
      }

      resetFields();
      setFieldsValue({ ...data });
      domainConverterFormRef.value?.setSelectedRowKeys([data.domainConverterId]);
      propertyTableRef.value?.setTableData(data.properties || []);
      templatesFormRef.value?.setTemplates(data.templates || []);
    },
  );

  function handleSubmit() {
    console.log('领域转换器', domainConverterFormRef.value?.getSelectRowKeys());
    console.log('全局参数', propertyTableRef.value?.getDataSource());
  }

  const [basicFormRegister, { setFieldsValue, resetFields }] = useCodeTemplateGroupBasicForm();

  const domainConverterFormRef = ref<{
    setSelectedRowKeys: (rowKeys: string[] | number[]) => void;
    getSelectRowKeys: () => string[];
  } | null>(null);

  const propertyTableRef = ref<{
    getDataSource: <T = Recordable>() => T[];
    setTableData: <T = Recordable>(values: T[]) => void;
  } | null>(null);

  const templatesFormRef = ref<{
    setTemplates: (templates: TemplateEntity[]) => void;
  } | null>(null);
</script>

<template>
  <BasicModal
    ref="modal"
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <tabs v-model:active-key="activeKey" tab-position="left">
      <tab-pane key="basic" tab="基础信息" :forceRender="true">
        <BasicForm @register="basicFormRegister" />
      </tab-pane>
      <tab-pane key="domain-converter" tab="领域转换器" :forceRender="true">
        <code-template-group-domain-converter-form ref="domainConverterFormRef" />
      </tab-pane>
      <tab-pane key="properties" tab="全局参数" :forceRender="true">
        <code-template-group-property-table ref="propertyTableRef" />
      </tab-pane>
      <tab-pane key="templates" tab="代码模板" :forceRender="true">
        <code-template-group-templates-form ref="templatesFormRef" />
      </tab-pane>
    </tabs>
  </BasicModal>
</template>
