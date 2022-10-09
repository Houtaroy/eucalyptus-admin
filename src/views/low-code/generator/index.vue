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
      <generator-database-form v-if="current === 0" @next="handleDatabase" />
      <generator-tables-form v-if="current === 1" @next="handleTables" />
      <generator-code-template-group-form v-if="current === 2" @next="handleCodeTemplateGroup" />
      <generator-properties-form v-if="current === 3" @next="handleProperties" />
      <generator-result v-if="current === 4" />
    </div>
  </page-wrapper>
</template>
<script setup lang="ts" name="LowCodeGenerator">
  import { ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Steps, Step } from 'ant-design-vue';
  import GeneratorDatabaseForm from './GeneratorDatabaseForm.vue';
  import GeneratorTablesForm from './GeneratorTablesForm.vue';
  import GeneratorCodeTemplateGroupForm from './GeneratorCodeTemplateGroupForm.vue';
  import GeneratorPropertiesForm from './GeneratorPropertiesForm.vue';
  import GeneratorResult from './GeneratorResult.vue';

  const current = ref(0);

  async function handleDatabase(database) {
    console.log(database);
  }

  async function handleTables(tablse) {
    console.log(tablse);
  }

  async function handleCodeTemplateGroup(codeTemplateGroup) {
    console.log(codeTemplateGroup);
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
