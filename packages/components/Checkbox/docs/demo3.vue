<template>
  <div>
    <div class="demo-container">
      <fz-checkbox-group v-model="checkboxGroup1" size="large">
        <fz-checkbox-button v-for="city in cities" :key="city" :label="city">
          {{ city }}
        </fz-checkbox-button>
      </fz-checkbox-group>
    </div>
    <div class="demo-container">
      <fz-checkbox-group v-model="checkboxGroup1" size="medium">
        <fz-checkbox-button v-for="city in cities" :key="city" :label="city">
          {{ city }}
        </fz-checkbox-button>
      </fz-checkbox-group>
    </div>
    <div class="demo-container">
      <fz-checkbox-group v-model="checkboxGroup1" size="small">
        <fz-checkbox-button v-for="city in cities" :key="city" :label="city">
          {{ city }}
        </fz-checkbox-button>
      </fz-checkbox-group>
    </div>

    <div class="demo-container">
      <fz-checkbox-group v-model="checkboxGroup1" size="mini">
        <fz-checkbox-button v-for="city in cities" :key="city" :label="city">
          {{ city }}
        </fz-checkbox-button>
      </fz-checkbox-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const checkboxGroup1 = ref(['Shanghai']);
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'];
</script>

<style lang="less" scoped>
.demo-container {
  margin-bottom: 20px;
}
</style>
