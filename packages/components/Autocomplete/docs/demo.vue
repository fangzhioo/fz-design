<template>
  <div>
    <fz-autocomplete v-model="state" :fetch-suggestions="querySearch" class="inline-input" placeholder="Please Input" @select="handleSelect" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
interface RestaurantItem {
  value: string;
  link: string;
}

const restaurants = ref<RestaurantItem[]>([]);
const state = ref<string>('');

const createFilter = (queryString: string) => {
  return (restaurant: RestaurantItem) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
  };
};

const querySearch = (queryString: string, cb: any) => {
  const results = queryString ? restaurants.value.filter(createFilter(queryString)) : restaurants.value;
  // call callback function to return suggestions
  cb(results);
};

const handleSelect = (item: RestaurantItem) => {
  console.log(item);
};

const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'fz-ui', link: 'https://fangzhioo.github.io/fz-ui' },
    { value: 'babel', link: 'https://github.com/babel/babel' },
  ];
};

onMounted(() => {
  restaurants.value = loadAll();
});
</script>
