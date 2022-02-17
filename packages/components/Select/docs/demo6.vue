<template>
  <div>
    <fz-select v-model="value" filterable placeholder="Select" class="m-2">
      <fz-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </fz-option>
    </fz-select>

    <fz-select
      v-model="value2"
      multiple
      filterable
      remote
      reserve-keyword
      placeholder="Please enter a keyword"
      :remote-method="remoteMethod"
      :loading="loading"
      class="m-2"
    >
      <fz-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"> </fz-option>
    </fz-select>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const value = ref('');
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];

interface ListItem {
  value: string;
  label: string;
}

const list = ref<ListItem[]>([]);
const options2 = ref<ListItem[]>([]);
const value2 = ref<string[]>([]);
const loading = ref(false);
const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

onMounted(() => {
  list.value = states.map((item) => {
    return { value: `value:${item}`, label: `label:${item}` };
  });
});

const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      options2.value = list.value.filter((item) => {
        return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
      });
    }, 500);
  } else {
    options2.value = [];
  }
};
</script>

<style lang="less" scoped>
.m-2 {
  margin: 6px;
}
</style>
