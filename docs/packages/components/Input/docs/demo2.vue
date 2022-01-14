<template>
  <div>
    <div>{{ val }}</div>
    <fz-input placeholder="请输入" type="textarea" :maxlength="20" show-word-limit v-model="val"></fz-input>
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
