<template>
  <fz-table :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }" style="width: 100%">
    <fz-table-column prop="date" label="Date" sortable width="180" />
    <fz-table-column prop="name" label="Name" width="180" />
    <fz-table-column prop="address" label="Address" :formatter="formatter" />
  </fz-table>
</template>

<script lang="ts" setup>
interface User {
  date: string;
  name: string;
  address: string;
}

const formatter = (row: User, column: any) => {
  return row.address;
};

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
];
</script>
