<template>
  <div>
    <div>{{ val }}</div>
    <div class="section-item">
      <fz-input placeholder="请输入" clearable v-model="val"></fz-input>
    </div>
    <div class="section-item">
      <fz-input placeholder="请输入" show-password v-model="val"></fz-input>
    </div>
    <div class="section-item">
      <fz-input placeholder="请输入" v-model="val">
        <template #append>.com</template>
      </fz-input>
    </div>
    <div class="section-item">
      <fz-input placeholder="请输入" v-model="val">
        <template #prepend>Http://</template>
      </fz-input>
    </div>
    <div class="section-item">
      <fz-input placeholder="请输入" prefix-icon="mobile-phone" v-model="val"></fz-input>
    </div>
    <div class="section-item">
      <fz-input placeholder="请输入" suffix-icon="search" v-model="val"></fz-input>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const val = ref('fzui');
    return {
      val,
    };
  },
});
</script>

<style lang="less" scoped>
.section-item {
  margin-bottom: 10px;
}
</style>
