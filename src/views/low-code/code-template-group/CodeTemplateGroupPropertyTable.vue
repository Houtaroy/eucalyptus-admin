<script lang="ts" setup>
  import { uniqueId } from 'lodash-es';

  import {
    BasicTable,
    TableAction,
    ActionItem,
    EditRecordRow,
    BasicColumn,
    useTable,
  } from '/@/components/Table';

  import { PropertyEntity } from '/@/apis/code-template-group/models/PropertyEntity';

  const [register, { getDataSource, setTableData }] = useTable({
    columns: [
      {
        title: '名称',
        dataIndex: 'name',
        editRow: true,
      },
      {
        title: '代码',
        dataIndex: 'code',
        editRow: true,
      },
      {
        title: '类型',
        dataIndex: 'type',
        editRow: true,
        editComponent: 'Select',
        editComponentProps: {
          options: [
            {
              label: '整型',
              value: 'INTEGER',
            },
            {
              label: '浮点型',
              value: 'FLOAT',
            },
            {
              label: '字符串',
              value: 'STRING',
            },
            {
              label: '布尔',
              value: 'BOOLEAN',
            },
            {
              label: '日期时间',
              value: 'LOCAL_DATE_TIME',
            },
          ],
        },
      },
    ],
    showIndexColumn: false,
    actionColumn: {
      width: 160,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
    pagination: false,
  });

  function handleAdd() {
    const data = getDataSource();
    const index = data.length + 1;
    const addRow: EditRecordRow = {
      name: `参数-${index}`,
      code: `propery-${index}`,
      type: 'STRING',
      editable: true,
      isNew: true,
    };
    data.push(addRow);
  }

  function handleDelete(record: EditRecordRow) {
    const data = getDataSource();
    const index = data.findIndex((item) => item.code === record.code);
    data.splice(index, 1);
  }

  function handleEdit(record: EditRecordRow) {
    record.onEdit?.(true);
  }

  function handleCancel(record: EditRecordRow) {
    record.onEdit?.(false);
    if (record.isNew) {
      handleDelete(record);
    }
  }

  function handleSave(record: EditRecordRow) {
    record.onEdit?.(false, true);
  }

  function createActions(record: EditRecordRow, column: BasicColumn): ActionItem[] {
    if (!record.editable) {
      return [
        {
          label: '编辑',
          onClick: handleEdit.bind(null, record),
        },
        {
          label: '删除',
          popConfirm: {
            title: '是否删除',
            confirm: handleDelete.bind(null, record, column),
          },
        },
      ];
    }
    return [
      {
        label: '保存',
        onClick: handleSave.bind(null, record, column),
      },
      {
        label: '取消',
        popConfirm: {
          title: '是否取消编辑',
          confirm: handleCancel.bind(null, record, column),
        },
      },
    ];
  }

  function setProperties(properties: PropertyEntity[]) {
    setTableData(
      properties.map((property) => {
        return {
          ...property,
          key: uniqueId('property-'),
        };
      }),
    );
  }

  function getProperties(): PropertyEntity[] {
    return getDataSource().map((data) => {
      return {
        name: data.name,
        code: data.code,
        type: data.type,
        description: data.description,
      };
    });
  }

  defineExpose({
    setProperties,
    getProperties,
  });
</script>
<template>
  <div>
    <BasicTable @register="register">
      <template #action="{ record, column }">
        <TableAction :actions="createActions(record, column)" />
      </template>
    </BasicTable>
    <a-button block type="dashed" @click="handleAdd"> 新增参数 </a-button>
  </div>
</template>
