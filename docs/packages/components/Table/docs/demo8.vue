<template>
  <fz-button @click="resetDateFilter">reset date filter</fz-button>
  <fz-button @click="clearFilter">reset all filters</fz-button>
  <fz-table ref="tableRef" row-key="date" :data="tableData" style="width: 100%">
    <fz-table-column
      prop="date"
      label="Date"
      sortable
      width="180"
      column-key="date"
      :filters="[
        { text: '2016-05-01', value: '2016-05-01' },
        { text: '2016-05-02', value: '2016-05-02' },
        { text: '2016-05-03', value: '2016-05-03' },
        { text: '2016-05-04', value: '2016-05-04' },
      ]"
      :filter-method="filterHandler"
    />
    <fz-table-column prop="name" label="Name" width="180" />
    <fz-table-column prop="address" label="Address" :formatter="formatter" />

    <fz-table-column
      prop="tag"
      label="Tag"
      width="100"
      :filters="[
        { text: 'Home', value: 'Home' },
        { text: 'Office', value: 'Office' },
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template #default="scope">
        <fz-tag :type="scope.row.tag === 'Home' ? '' : 'success'" disable-transitions>{{ scope.row.tag }}</fz-tag>
      </template>
    </fz-table-column>
  </fz-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface User {
  date: string;
  name: string;
  address: string;
  tag: string;
}

const tableRef = ref<any>();

const resetDateFilter = () => {
  tableRef.value!.clearFilter(['date']);
};

const clearFilter = () => {
  tableRef.value!.clearFilter();
};
const formatter = (row: User, column: any) => {
  return row.address;
};
const filterTag = (value: string, row: User) => {
  return row.tag === value;
};
const filterHandler = (value: string, row: any, column: any) => {
  const property: string = column['property'];
  return row[property] === value;
};

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Office',
  },
];
</script>
