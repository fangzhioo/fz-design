<template>
  <div class="guide-wrapper">
    <fz-table :data="tableData" stripe border style="width: 100%">
      <fz-table-column prop="date" label="Date" width="180" />
      <fz-table-column prop="name" label="Name" width="180" />
      <fz-table-column prop="address" label="Address" />
    </fz-table>
    <div style="height: 40px"></div>
    <fz-rich-editor v-model="editorValue"></fz-rich-editor>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'GuidePage',
  setup(props, context) {
    const tableData = [
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

    const editorValue = ref('<p>A Vue.js wrapper component for tiptap to use <code>v-model</code>.</p>');
    const timeValue = ref([]);

    return {
      tableData,
      timeValue,
      editorValue,
    };
  },
});
</script>

<style scoped></style>
