<script lang="ts" setup>
  import { ref } from 'vue';

  import { Row as ARow, Col as ACol } from 'ant-design-vue';

  import { CodeEditor, MODE } from '/@/components/CodeEditor';
  import { BasicFileTree, File } from '/@/components/FileTree';

  import { TemplateEntity } from '/@/apis/code-template-group/models/TemplateEntity';

  const treeRef = ref<{
    setFiles: (files: File[]) => void;
    getFiles: () => File[];
  } | null>(null);

  const current = ref<File | null>(null);

  const modes = new Map<string, MODE>();
  modes.set('java', MODE.JAVA);
  modes.set('xml', MODE.XML);

  function getCodeEditorMode(file: File): MODE {
    return modes.get(file.name.substring(file.name.lastIndexOf('.') + 1)) || MODE.HTML;
  }

  function handleSelect(file: File) {
    current.value = file;
  }

  function setTemplates(templates: TemplateEntity[]) {
    current.value = null;
    treeRef.value?.setFiles(
      templates.map((template) => ({
        ...template,
        isDirectory: false,
      })),
    );
  }

  function getTemplates(): TemplateEntity[] {
    const result: TemplateEntity[] = [];
    if (treeRef.value) {
      treeRef.value.getFiles().forEach((file) => {
        result.push({
          name: file.name,
          content: file.content,
        });
      });
    }
    return result;
  }

  defineExpose({
    setTemplates,
    getTemplates,
  });
</script>

<template>
  <a-row>
    <a-col :span="8">
      <basic-file-tree ref="treeRef" title="模板列表" @select="handleSelect" />
    </a-col>
    <a-col :span="16">
      <code-editor
        v-if="current && !current.isDirectory"
        v-model:value="current.content"
        :mode="getCodeEditorMode(current)"
      />
    </a-col>
  </a-row>
</template>
