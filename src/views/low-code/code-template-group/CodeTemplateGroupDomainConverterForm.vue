<script lang="ts" setup>
  import { Row as ARow, Col as ACol } from 'ant-design-vue';

  import { BasicTable, useTable } from '/@/components/Table';

  import { DomainConverter } from '/@/apis/domain-converter/models/DomainConverter';

  import { listDomainConverters } from '/@/apis/domain-converter';

  const [converterRegister, { getSelectRows, getSelectRowKeys, setSelectedRowKeys, reload }] =
    useTable({
      rowKey: 'id',
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
        },
      ],
      pagination: false,
      api: listDomainConverters,
      rowSelection: {
        type: 'radio',
        onChange: handleChange,
      },
    });

  const [propertyRegister, { setTableData: setPropertyTableData }] = useTable({
    rowKey: 'name',
    columns: [
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '键值',
        dataIndex: 'key',
      },
      {
        title: '类型',
        dataIndex: 'type',
      },
      {
        title: '描述',
        dataIndex: 'description',
      },
    ],
    pagination: false,
  });

  function getSelectedId(): string | undefined {
    return getSelectRowKeys()[0];
  }

  function setSelectedId(id?: string) {
    setSelectedRowKeys(id ? [id] : []);
    setPropertyTableData(id ? getSelectRows()[0].properties : []);
  }

  function handleChange(selectedRowKeys: string[] | number[], selectedRow: DomainConverter[]) {
    if (selectedRowKeys.length > 0 && selectedRow.length > 0) {
      setPropertyTableData(selectedRow[0].properties ?? []);
    } else {
      setPropertyTableData([]);
    }
  }

  defineExpose({
    reload,
    setSelectedId,
    getSelectedId,
  });
</script>

<template>
  <a-row>
    <a-col :span="6">
      <basic-table @register="converterRegister" />
    </a-col>
    <a-col :span="18">
      <basic-table @register="propertyRegister" />
    </a-col>
  </a-row>
</template>
