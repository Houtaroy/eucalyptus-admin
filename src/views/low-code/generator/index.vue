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
      <generator-properties-form v-show="current === 3" @next="handleProperties" />
      <generator-result v-show="current === 4" />
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
  import { CodeTemplateGroupEntity } from '/@/apis/code-template-group/models/CodeTemplateGroupEntity';

  import { listTables } from '/@/apis/databases';
  import { loadCodeTemplateGroupById } from '/@/apis/code-template-group';

  const tablesFormRef = ref<{
    setTableData: <T = Recordable>(values: T[]) => void;
  } | null>(null);

  const current = ref(0);
  const tablesRequest = ref<TablesRequest>({});
  const tables = ref<JdbcTable[]>([]);
  const codeTemplateGroup = ref<CodeTemplateGroupEntity | null>(null);

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
    current.value++;
  }

  async function handleProperties(properties) {
    console.log(properties);
  }
</script>
<style lang="less" scoped>
  .step-form-form {
    width: 1000px;
    margin: 0 auto;
  }
</style>
