<template>
  <div style="margin-bottom: 20px">
    <div style="margin-bottom: 20px">单选</div>
    <fz-table ref="singleTableRef" :data="tableData" highlight-current-row style="width: 100%" @current-change="handleCurrentChange">
      <fz-table-column type="index" width="50" />
      <fz-table-column property="date" label="Date" width="120" />
      <fz-table-column property="name" label="Name" width="120" />
      <fz-table-column property="address" label="Address" />
    </fz-table>
    <div style="margin-top: 20px">
      <fz-button @click="setCurrent(tableData[1])">Select second row</fz-button>
      <fz-button @click="setCurrent()">Clear selection</fz-button>
    </div>
  </div>
  <div>
    <div style="margin-bottom: 20px">多选</div>
    <fz-table ref="multipleTableRef" :data="tableData2" style="width: 100%" @selection-change="handleSelectionChange">
      <fz-table-column type="selection" width="55" />
      <fz-table-column label="Date" width="120">
        <template #default="scope">{{ scope.row.date }}</template>
      </fz-table-column>
      <fz-table-column property="name" label="Name" width="120" />
      <fz-table-column property="address" label="Address" show-overflow-tooltip />
    </fz-table>
    <div style="margin-top: 20px">
      <fz-button @click="toggleSelection([tableData2[1], tableData2[2]])">Toggle selection status of second and third rows</fz-button>
      <fz-button @click="toggleSelection()">Clear selection</fz-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface User {
  date: string;
  name: string;
  address: string;
}

// 单选
const currentRow = ref();
const singleTableRef = ref<any>();

const setCurrent = (row?: User) => {
  singleTableRef.value!.setCurrentRow(row);
};
const handleCurrentChange = (val: User | undefined) => {
  currentRow.value = val;
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

// 多选
const multipleTableRef = ref<any>();
const multipleSelection = ref<User[]>([]);
const toggleSelection = (rows?: User[]) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value!.toggleRowSelection(row, undefined);
    });
  } else {
    multipleTableRef.value!.clearSelection();
  }
};
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};

const tableData2: User[] = [
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
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
];
</script>
