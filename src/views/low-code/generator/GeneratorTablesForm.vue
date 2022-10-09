<script lang="ts" setup>
  import { Row as ARow, Col as ACol, message } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';

  const [register, { setTableData, getSelectRows }] = useTable({
    rowKey: 'name',
    columns: [
      {
        title: '表名',
        dataIndex: 'name',
      },
      {
        title: '备注',
        dataIndex: 'remarks',
      },
    ],
    pagination: false,
    rowSelection: { type: 'checkbox' },
  });

  const emit = defineEmits(['next', 'prev']);

  function handlePrev() {
    emit('prev');
  }

  function handleNext() {
    const result = getSelectRows();
    if (result.length === 0) {
      message.error('请至少选择一个数据库表');
      return false;
    }
    emit('next', result);
  }

  defineExpose({
    setTableData,
  });
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
