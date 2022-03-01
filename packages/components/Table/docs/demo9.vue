<template>
  <fz-table :data="tableData" style="width: 100%">
    <fz-table-column label="Date" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <fz-icon name="time"></fz-icon>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </div>
      </template>
    </fz-table-column>
    <fz-table-column label="Name" width="180">
      <template #default="scope">
        <fz-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>name: {{ scope.row.name }}</div>
            <div>address: {{ scope.row.address }}</div>
          </template>
          <template #reference>
            <fz-tag>{{ scope.row.name }}</fz-tag>
          </template>
        </fz-popover>
      </template>
    </fz-table-column>
    <fz-table-column label="Operations">
      <template #default="scope">
        <fz-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</fz-button>
        <fz-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</fz-button>
      </template>
    </fz-table-column>
  </fz-table>
</template>

<script lang="ts" setup>
interface User {
  date: string;
  name: string;
  address: string;
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
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
