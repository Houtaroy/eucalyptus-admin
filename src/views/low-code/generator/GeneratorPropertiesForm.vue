<script lang="ts" setup>
  import { ref } from 'vue';

  import { BasicForm, useForm, FormSchema } from '/@/components/Form';

  import { PropertyEntity } from '/@/apis/code-template-group/models/PropertyEntity';

  import { property2FormSchema } from './PropertyHelper';

  const schemas = ref<FormSchema[]>();

  const [register, { validate }] = useForm({
    labelWidth: 100,
    actionColOptions: {
      span: 14,
    },
    resetButtonOptions: {
      text: '上一步',
    },
    resetFunc: handlePrev,
    submitButtonOptions: {
      text: '下一步',
    },
    submitFunc: handleNext,
  });

  const emit = defineEmits(['next', 'prev']);

  async function handlePrev() {
    emit('prev');
  }

  async function handleNext() {
    emit('next', await validate());
  }

  function setSchemas(properties: PropertyEntity[]) {
    schemas.value = properties.map((property) => property2FormSchema(property));
  }

  defineExpose({
    setSchemas,
  });
</script>
<template>
  <basic-form @register="register" :schemas="schemas" />
</template>
