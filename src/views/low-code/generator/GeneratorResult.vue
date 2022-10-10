<script lang="ts" setup>
  import { ref, Ref } from 'vue';

  import { Row as ARow, Col as ACol, Tabs, TabPane } from 'ant-design-vue';

  import { CodeEditor, getCodeEditorMode } from '/@/components/CodeEditor';

  import { GeneratePreview } from '/@/apis/code-template-group/models/GeneratePreview';

  import { keys } from 'lodash-es';

  const preview = ref<GeneratePreview>();
  const tables = ref<string[]>();
  const activeTable = ref<string>();
  const activeFile: Ref<Map<string, string | undefined>> = ref(new Map());

  const emit = defineEmits(['prev', 'download']);

  function handlePrev() {
    emit('prev');
  }

  function handleDownload() {
    emit('download');
  }

  function setPreview(data: GeneratePreview) {
    preview.value = data;
    tables.value = keys(data);
    activeTable.value = tables.value[0];
    tables.value.forEach((table) => {
      activeFile.value.set(table, preview.value?.[table][0].name);
    });
  }

  defineExpose({
    setPreview,
  });
</script>
<template>
  <div>
    <a-row type="flex" justify="center">
      <tabs v-model="activeTable" tab-position="left">
        <tab-pane v-for="(results, table) in preview" :key="table" :tab="table">
          <tabs v-model="activeFile[table]" tab-position="top">
            <tab-pane v-for="result in results" :key="result.name" :tab="result.name">
              <CodeEditor
                v-model:value="result.code"
                :mode="getCodeEditorMode(result.name)"
                readonly
              />
            </tab-pane>
          </tabs>
        </tab-pane>
      </tabs>
    </a-row>
    <a-row type="flex" justify="center">
      <a-col :span="4"><a-button @click="handlePrev">上一步</a-button></a-col>
      <a-col :span="4"><a-button type="primary" @click="handleDownload">下载</a-button></a-col>
    </a-row>
  </div>
</template>
