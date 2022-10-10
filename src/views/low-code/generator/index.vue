<template>
  <page-wrapper title="代码生成器" contentBackground contentClass="p-4">
    <div class="step-form-form">
      <steps :current="current">
        <step title="连接数据库" />
        <step title="选择数据表" />
        <step title="选择代码模板组" />
        <step title="全局参数配置" />
        <step title="代码生成结果" />
      </steps>
    </div>
    <div class="mt-5">
      <generator-database-form v-show="current === 0" @next="handleDatabase" />
      <generator-tables-form
        ref="tablesFormRef"
        v-show="current === 1"
        @next="handleTables"
        @prev="handlePrev"
      />
      <generator-code-template-group-form
        v-show="current === 2"
        @prev="handlePrev"
        @next="handleCodeTemplateGroup"
      />
      <generator-properties-form
        ref="propertiesFormRef"
        v-show="current === 3"
        @prev="handlePrev"
        @next="handleProperties"
      />
      <generator-result
        ref="resultRef"
        v-show="current === 4"
        @prev="handlePrev"
        @download="handleDownload"
      />
    </div>
  </page-wrapper>
</template>
<script setup lang="ts" name="LowCodeGenerator">
  import { ref } from 'vue';

  import { Steps, Step } from 'ant-design-vue';

  import { PageWrapper } from '/@/components/Page';

  import GeneratorDatabaseForm from './GeneratorDatabaseForm.vue';
  import GeneratorTablesForm from './GeneratorTablesForm.vue';
  import GeneratorCodeTemplateGroupForm from './GeneratorCodeTemplateGroupForm.vue';
  import GeneratorPropertiesForm from './GeneratorPropertiesForm.vue';
  import GeneratorResult from './GeneratorResult.vue';

  import { TablesRequest } from '/@/apis/databases/models/TablesRequest';
  import { JdbcTable } from '/@/apis/databases/models/JdbcTable';
  import { PropertyEntity } from '/@/apis/code-template-group/models/PropertyEntity';
  import { CodeTemplateGroupEntity } from '/@/apis/code-template-group/models/CodeTemplateGroupEntity';
  import { GeneratePreview } from '/@/apis/code-template-group/models/GeneratePreview';

  import { listTables } from '/@/apis/databases';
  import {
    loadCodeTemplateGroupById,
    generatePreview,
    generateDownload,
  } from '/@/apis/code-template-group';

  const tablesFormRef = ref<{
    setTableData: <T = Recordable>(values: T[]) => void;
  } | null>(null);
  const propertiesFormRef = ref<{
    setSchemas: (properties: PropertyEntity[]) => void;
    setFieldsValue: <T>(values: T) => Promise<void>;
  } | null>(null);
  const resultRef = ref<{
    setPreview: (preview: GeneratePreview) => void;
  } | null>(null);

  const current = ref(0);
  const tablesRequest = ref<TablesRequest>({});
  const tables = ref<JdbcTable[]>([]);
  const codeTemplateGroup = ref<CodeTemplateGroupEntity | null>(null);
  const properties = ref<{ [key: string]: any }>({});

  function handlePrev() {
    current.value--;
  }

  async function handleDatabase(data: TablesRequest) {
    tablesRequest.value = data;
    tables.value = await listTables(data);
    tablesFormRef.value?.setTableData(tables.value);
    current.value++;
  }

  async function handleTables(data: JdbcTable[]) {
    tables.value = data;
    current.value++;
  }

  async function handleCodeTemplateGroup(id: string) {
    codeTemplateGroup.value = await loadCodeTemplateGroupById(id);
    propertiesFormRef.value?.setSchemas(codeTemplateGroup.value.properties);
    if (properties.value) {
      propertiesFormRef.value?.setFieldsValue(properties.value);
    }
    current.value++;
  }

  async function handleProperties(data: { [key: string]: any }) {
    properties.value = data;
    if (!codeTemplateGroup.value?.id) {
      return;
    }
    resultRef.value?.setPreview(
      await generatePreview(codeTemplateGroup.value.id, {
        tables: tables.value,
        globalOptions: properties.value,
      }),
    );
    current.value++;
  }

  async function handleDownload() {
    if (!codeTemplateGroup.value?.id) {
      return;
    }
    window.open(
      '/generator-results/' +
        (await generateDownload(codeTemplateGroup.value.id, {
          tables: tables.value,
          globalOptions: properties.value,
        })),
    );
  }
</script>
<style lang="less" scoped>
  .step-form-form {
    width: 1000px;
    margin: 0 auto;
  }
</style>
