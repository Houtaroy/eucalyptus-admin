<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, TableAction, useTable } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useLoading } from '/@/components/Loading';

  import CodeTemplateGroupModal from './CodeTemplateGroupModal.vue';

  import {
    listCodeTemplateGroups,
    loadCodeTemplateGroupById,
    deleteCodeTemplateGroupById,
  } from '/@/apis/code-template-group';
  import { CodeTemplateGroupEntity } from '/@/apis/code-template-group/models/CodeTemplateGroupEntity';

  const [registerModal, { openModal }] = useModal();

  const [register, { reload }] = useTable({
    rowKey: 'id',
    columns: [
      {
        title: '模板名称',
        dataIndex: 'name',
      },
      {
        title: '模板描述',
        dataIndex: 'description',
      },
    ],
    api: listCodeTemplateGroups,
    actionColumn: {
      width: 250,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '加载中...',
  });

  function handleAdd() {
    openModal(true, {});
  }
  async function handleEdit(record: CodeTemplateGroupEntity) {
    openFullLoading();
    const data = await loadCodeTemplateGroupById(record.id!);
    closeFullLoading();
    openModal(true, data);
  }
  function handleDelete(record: CodeTemplateGroupEntity) {
    if (record.id) {
      deleteCodeTemplateGroupById(record.id);
      reload();
    }
  }
</script>
<template>
  <page-wrapper dense contentFullHeight fixedHeight contentClass="flex">
    <basic-table @register="register">
      <template #action="{ record }">
        <table-action
          :actions="[
            {
              icon: 'ant-design:edit-outlined',
              tooltip: '编辑',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ic:outline-delete-outline',
              color: 'error',
              tooltip: '删除',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
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
    <code-template-group-modal @register="registerModal" @success="reload" />
  </page-wrapper>
</template>
