<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { FzScrollbar } from 'fz-design';

const max = ref(0)
const value = ref(0)
const innerRef = ref<HTMLDivElement>()
const scrollbarRef = ref<InstanceType<typeof FzScrollbar>>()

onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  max.value = innerRef.value!.clientHeight - 380
})

const inputSlider = (value: number): void => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  scrollbarRef.value!.setScrollTop(value)
}
const scroll = ({ scrollTop }): void => {
  value.value = scrollTop
}
const formatTooltip = (value: number): string => {
  return `${value} px`
}
</script>

<template>
  <fz-scrollbar ref="scrollbarRef" height="400px" always @scroll="scroll">
    <div ref="innerRef">
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
        {{ item }}
      </p>
    </div>
  </fz-scrollbar>

  <fz-slider
    v-model="value"
    :max="max"
    :format-tooltip="formatTooltip"
    @input="inputSlider"
  />
</template>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--fz-color-primary-light-9);
  color: var(--fz-color-primary);
}
.fz-slider {
  margin-top: 20px;
}
</style>
