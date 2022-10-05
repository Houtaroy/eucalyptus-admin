import { useForm } from '/@/components/Form';

export function useCodeTemplateGroupBasicForm() {
  return useForm({
    labelWidth: 100,
    schemas: [
      {
        field: 'name',
        label: '名称',
        colProps: { span: 24 },
        required: true,
        component: 'Input',
      },
      {
        field: 'description',
        label: '描述',
        colProps: { span: 24 },
        required: true,
        component: 'InputTextArea',
        componentProps: {
          rows: 4,
        },
      },
    ],
    showActionButtonGroup: false,
  });
}
