<script lang="ts" setup>
  import { ref, unref, computed } from 'vue';

  import { Tabs, TabPane, message } from 'ant-design-vue';

  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm } from '/@/components/Form';
  import { FetchParams } from '/@/components/Table';

  import { useCodeTemplateGroupBasicForm } from './CodeTemplateGroupBasicForm';
  import CodeTemplateGroupDomainConverterForm from './CodeTemplateGroupDomainConverterForm.vue';
  import CodeTemplateGroupPropertyTable from './CodeTemplateGroupPropertyTable.vue';
  import CodeTemplateGroupTemplatesForm from './CodeTemplateGroupTemplatesForm.vue';

  import { CodeTemplateGroupEntity } from '/@/apis/code-template-group/models/CodeTemplateGroupEntity';
  import { TemplateEntity } from '/@/apis/code-template-group/models/TemplateEntity';

  import { addCodeTemplateGroup, updateCodeTemplateGroupById } from '/@/apis/code-template-group';

  const [basicFormRegister, { setFieldsValue, resetFields, validate }] =
    useCodeTemplateGroupBasicForm();

  const domainConverterFormRef = ref<{
    reload: (opt?: FetchParams) => Promise<void>;
    getSelectedId: () => string | undefined;
    setSelectedId: (id?: string) => void;
  } | null>(null);

  const propertyTableRef = ref<{
    getDataSource: <T = Recordable>() => T[];
    setTableData: <T = Recordable>(values: T[]) => void;
  } | null>(null);

  const templatesFormRef = ref<{
    setTemplates: (templates: TemplateEntity[]) => void;
    getTemplates: () => TemplateEntity[];
  } | null>(null);

  const isUpdate = ref(true);
  const getTitle = computed(() => (!unref(isUpdate) ? '新增代码模板组' : '编辑代码模板组'));
  const id = ref<string | undefined>();
  const activeKey = ref('basic');

  const [registerModal, { setModalProps, closeModal }] = useModalInner(
    async (data: CodeTemplateGroupEntity) => {
      setModalProps({ confirmLoading: false, defaultFullscreen: true, canFullscreen: false });
      activeKey.value = 'basic';
      isUpdate.value = !!data?.id;

      if (unref(isUpdate)) {
        id.value = data.id!;
      }

      resetFields();
      setFieldsValue({ ...data });
      await domainConverterFormRef.value?.reload();
      domainConverterFormRef.value?.setSelectedId(data.domainConverterId);
      propertyTableRef.value?.setTableData(data.properties || []);
      templatesFormRef.value?.setTemplates(data.templates || []);
    },
  );

  const emit = defineEmits(['success', 'register']);

  async function handleSubmit() {
    const basic = await validate();
    const domainConverterId = domainConverterFormRef.value?.getSelectedId();
    if (!domainConverterId) {
      message.error('请选择领域转换器');
      return;
    }
    const templates = templatesFormRef.value?.getTemplates();
    if (!templates || templates?.length <= 0) {
      message.error('请至少创建一个模板文件');
      return;
    }
    const entity: CodeTemplateGroupEntity = {
      id: id.value,
      ...basic,
      domainConverterId,
      properties: propertyTableRef.value?.getDataSource(),
      templates: templatesFormRef.value?.getTemplates(),
    };
    entity.id
      ? await updateCodeTemplateGroupById(entity.id, entity)
      : await addCodeTemplateGroup(entity);
    closeModal();
    emit('success');
  }
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
