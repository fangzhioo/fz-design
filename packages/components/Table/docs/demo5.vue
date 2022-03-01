<template>
  <fz-table :data="tableData" style="width: 100%">
    <fz-table-column prop="date" label="Date" width="150" />
    <fz-table-column label="Delivery Info">
      <fz-table-column prop="name" label="Name" width="120" />
      <fz-table-column label="Address Info">
        <fz-table-column prop="state" label="State" width="120" />
        <fz-table-column prop="city" label="City" width="120" />
        <fz-table-column prop="address" label="Address" />
        <fz-table-column prop="zip" label="Zip" width="120" />
      </fz-table-column>
    </fz-table-column>
  </fz-table>
</template>

<script lang="ts" setup>
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
];
</script>
