<script lang="ts" setup>
  import { BasicColumn, BasicTable, TableAction, useTable } from '/@/components/Table';
  import { listCodeTemplateGroups } from '/@/apis/code-template-group';
  const columns: BasicColumn[] = [
    {
      title: '模板名称',
      dataIndex: 'name',
    },
    {
      title: '模板描述',
      dataIndex: 'description',
    },
  ];

  const [register] = useTable({
    rowKey: 'id',
    columns: columns,
    api: listCodeTemplateGroups,
  });

  function handleAdd() {}
  function handleEdit() {}
  function handleDelete() {}
</script>
<template>
  <basic-table @register="register">
    <template #action="{ record }">
      <table-action
        :actions="[
          {
            label: '编辑',
            icon: 'ant-design:edit-outlined',
            onClick: handleEdit.bind(null, record),
          },
          {
            label: '删除',
            icon: 'ic:outline-delete-outline',
            onClick: handleDelete.bind(null, record),
          },
        ]"
      />
    </template>
    <template #toolbar>
      <a-button pre-icon="ant-design:plus-outlined" type="primary" @click="handleAdd">
        新增
      </a-button>
    </template>
  </basic-table>
</template>
