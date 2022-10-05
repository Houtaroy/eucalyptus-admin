<script lang="ts" setup>
  import { Row as ARow, Col as ACol } from 'ant-design-vue';

  import { BasicTable, useTable } from '/@/components/Table';

  import { DomainConverter } from '/@/apis/domain-converter/models/DomainConverter';

  import { listDomainConverters } from '/@/apis/domain-converter';

  function handleChange(selectedRowKeys: string[] | number[], selectedRow: DomainConverter[]) {
    if (selectedRowKeys.length > 0 && selectedRow.length > 0) {
      setPropertyTableData(selectedRow[0].properties ?? []);
    } else {
      setPropertyTableData([]);
    }
  }
  const [converterRegister, { getSelectRowKeys, setSelectedRowKeys }] = useTable({
    rowKey: 'id',
    columns: [
      {
        title: '名称',
        dataIndex: 'name',
      },
    ],
    pagination: false,
    api: listDomainConverters,
    afterFetch: (data: DomainConverter[]) => {
      const selectedRowKeys = getSelectRowKeys();
      const index = data.findIndex((converter) => converter.id === selectedRowKeys[0]);
      setPropertyTableData(data[index].properties ?? []);
    },
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

  defineExpose({
    setSelectedRowKeys,
    getSelectRowKeys,
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
