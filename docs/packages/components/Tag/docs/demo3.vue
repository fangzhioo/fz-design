<template>
  <fz-tag v-for="tag in dynamicTags" :key="tag" class="ml-2" closable :disable-transitions="false" @close="handleClose(tag)">
    {{ tag }}
  </fz-tag>
  <fz-input
    v-if="inputVisible"
    ref="InputRef"
    v-model="inputValue"
    class="ml-2 w-20"
    size="mini"
    @keyup.enter="handleInputConfirm"
    @blur="handleInputConfirm"
  />
  <fz-button v-else class="button-new-tag ml-2" size="mini" @click="showInput"> + New Tag </fz-button>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue';

const inputValue = ref('');
const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3']);
const inputVisible = ref(false);
const InputRef = ref<any>();

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = '';
};
</script>

<style lang="less" scoped>
.ml-2 {
  margin-left: 6px;
}
.w-20 {
  width: 100px;
}
</style>
