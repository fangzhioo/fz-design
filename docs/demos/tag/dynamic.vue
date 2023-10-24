<script lang="ts" setup>
  import { nextTick, ref } from 'vue'
  import { FzInput } from 'fz-design'
  
  const inputValue = ref('')
  const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
  const inputVisible = ref(false)
  const inputRef = ref<InstanceType<typeof FzInput>>()
  
  const handleClose = (tag: string): void => {
    dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
  }
  
  const showInput = (): void => {
    inputVisible.value = true
    nextTick(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      inputRef.value!.input!.focus()
    })
  }
  
  const handleInputConfirm = (): void => {
    if (inputValue.value) {
      dynamicTags.value.push(inputValue.value)
    }
    inputVisible.value = false
    inputValue.value = ''
  }
  </script>
  
<template>
  <fz-tag
    v-for="tag in dynamicTags"
    :key="tag"
    class="mx-1"
    closable
    :disable-transitions="false"
    @close="handleClose(tag)"
  >
    {{ tag }}
  </fz-tag>
  <fz-input
    v-if="inputVisible"
    ref="inputRef"
    v-model="inputValue"
    class="ml-1 w-20"
    size="small"
    @keyup.enter="handleInputConfirm"
    @blur="handleInputConfirm"
  />
  <fz-button v-else class="ml-1" size="small" @click="showInput">
    + New Tag
  </fz-button>
</template>

<style scoped>
  .mx-1 {
    margin: 0 4px;
  }
  .ml-1 {
    margin-left: 4px;
  }
  .w-20 {
    width: 80px;
  }
</style>
