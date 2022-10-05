<script lang="ts" setup>
  import { ref } from 'vue';

  import { Tree, Dropdown, Menu as AMenu, MenuItem, Input as AInput } from 'ant-design-vue';

  import { File, FileTreeItem } from './typing';

  import {
    newFileTreeItem,
    toFileTreeItems,
    findFileByKey,
    deleteFileByKey,
  } from './FileTreeHelper';

  const vFocus = {
    mounted: (el) => el.focus(),
  };

  const props = defineProps<{
    title: string;
    files?: File[];
  }>();

  function setFiles(files: File[]) {
    treeDataRef.value[0].children = toFileTreeItems(files);
  }

  const treeDataRef = ref<FileTreeItem[]>([
    {
      key: '_root',
      name: props.title,
      content: '',
      isDirectory: true,
      isRoot: true,
      state: {
        renaming: false,
      },
    },
  ]);

  setFiles(props.files || []);

  const current = ref<FileTreeItem | null>(null);

  const emit = defineEmits(['select']);

  function handleSelected(keys: string[] | number[], event) {
    emit('select', keys, event.node?.dataRef);
  }

  function handleNewFile() {
    const item = newFileTreeItem();
    treeDataRef.value[0].children?.push(item);
    current.value = item;
  }

  function handleRename(key: string) {
    const file = findFileByKey(key, treeDataRef.value);
    if (file) {
      current.value = file;
      current.value.state.renaming = true;
    }
  }

  function handleRenamed() {
    if (current.value) {
      if (current.value.name) {
        current.value.state.renaming = false;
      } else {
        deleteFileByKey(current.value.key, treeDataRef.value);
        current.value = null;
      }
    }
  }

  function handleDelete(key: string) {
    deleteFileByKey(key, treeDataRef.value);
  }

  const menuActions = new Map<string | number, (nodeKey: string) => void>();
  menuActions.set('newFile', handleNewFile);
  menuActions.set('rename', handleRename);
  menuActions.set('delete', handleDelete);

  function handleMenu(nodeKey: string, menukey: string | number) {
    const action = menuActions.get(menukey);
    action && action(nodeKey);
  }

  defineExpose({
    setFiles,
  });
</script>
<template>
  <tree :tree-data="treeDataRef" @select="handleSelected" @contextmenu.prevent>
    <template #title="{ key: nodeKey, name, isDirectory, isRoot }">
      <dropdown :trigger="['contextmenu']">
        <a-input
          v-if="current?.key === nodeKey && current?.state.renaming"
          v-focus
          v-model:value="current.name"
          @blur="handleRenamed"
          @press-enter="handleRenamed"
        />
        <span v-else>{{ name }}</span>
        <template #overlay>
          <a-menu @click="({ key: menuKey }) => handleMenu(nodeKey, menuKey)">
            <menu-item v-if="isDirectory" key="newFile">新建文件...</menu-item>
            <menu-item v-if="!isRoot" key="rename">重命名...</menu-item>
            <menu-item v-if="!isRoot" key="delete">删除</menu-item>
          </a-menu>
        </template>
      </dropdown>
    </template>
  </tree>
</template>
