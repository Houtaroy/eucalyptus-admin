<script setup lang="ts">
  import { Row as ARow, Col as ACol, message } from 'ant-design-vue';

  import { BasicTable, useTable } from '/@/components/Table';

  import { listCodeTemplateGroups } from '/@/apis/code-template-group';

  const [register, { getSelectRowKeys }] = useTable({
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
    pagination: false,
    rowSelection: { type: 'radio' },
  });

  const emit = defineEmits(['next', 'prev']);

  function handlePrev() {
    emit('prev');
  }

  function handleNext() {
    const result = getSelectRowKeys();
    if (result.length != 1) {
      message.error('请选择代码模板组');
      return false;
    }
    emit('next', result[0]);
  }
</script>
<template>
  <div>
    <a-row type="flex" justify="center">
      <a-col :span="20" type="flex" justify="center">
        <BasicTable @register="register" />
      </a-col>
    </a-row>
    <a-row type="flex" justify="center">
      <a-col :span="4"><a-button @click="handlePrev">上一步</a-button></a-col>
      <a-col :span="4"><a-button type="primary" @click="handleNext">下一步</a-button></a-col>
    </a-row>
  </div>
</template>
