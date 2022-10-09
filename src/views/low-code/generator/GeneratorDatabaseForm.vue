<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/Form';

  const emit = defineEmits(['next']);

  async function submit() {
    emit('next', await validate());
  }

  const [register, { validate }] = useForm({
    labelWidth: 100,
    schemas: [
      {
        field: 'url',
        component: 'Input',
        label: 'JDBC链接地址',
        required: true,
        defaultValue: 'jdbc:mysql://bj-cdb-9amt73r4.sql.tencentcdb.com:59997/eucalyptus',
        colProps: {
          span: 24,
        },
      },
      {
        field: 'user',
        component: 'Input',
        label: '用户名',
        required: true,
        defaultValue: 'test',
        colProps: {
          span: 24,
        },
      },
      {
        field: 'password',
        component: 'Input',
        label: '密码',
        required: true,
        defaultValue: 'test@5015021301',
        colProps: {
          span: 24,
        },
      },
      {
        field: 'catalog',
        component: 'Input',
        label: '数据库名称',
        required: true,
        defaultValue: 'eucalyptus',
        colProps: {
          span: 24,
        },
      },
    ],
    actionColOptions: {
      span: 14,
    },
    showResetButton: false,
    submitButtonOptions: {
      text: '下一步',
    },
    submitFunc: submit,
  });
</script>
<template>
  <basic-form @register="register" />
</template>
