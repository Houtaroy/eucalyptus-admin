<script lang="ts" setup>
  import { ref } from 'vue';

  import { Row as ARow, Col as ACol } from 'ant-design-vue';

  import { BasicFileTree, File } from '/@/components/FileTree';

  import { TemplateEntity } from '/@/apis/code-template-group/models/TemplateEntity';

  const treeRef = ref<{
    setFiles: (files: File[]) => void;
  } | null>(null);

  function handleSelect(keys: string[] | number[], item: File) {
    console.log('选择了', keys);
    console.log('选择了', item);
  }

  function setTemplates(templates: TemplateEntity[]) {
    treeRef.value?.setFiles(
      templates.map((template) => ({
        ...template,
        isDirectory: false,
      })),
    );
  }

  defineExpose({
    setTemplates,
  });
</script>

<template>
  <a-row>
    <a-col :span="8">
      <basic-file-tree ref="treeRef" title="模板列表" @select="handleSelect" />
    </a-col>
    <a-col :span="16"> 代码编辑器 </a-col>
  </a-row>
</template>
