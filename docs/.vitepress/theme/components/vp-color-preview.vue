<template>
  <div v-if="baseColor" class="vp-color-preview" :class="`is-${props.mode}`">
    <div class="vp-color-preview__base" :style="{ backgroundColor: baseColor.color }" @click="handleColor(baseColor)">
      {{ baseColor.text }}
      <div class="vp-color-preview__hex">{{ baseColor.hex }}</div>
    </div>
    <div class="vp-color-preview__colors">
      <div class="vp-color-preview__color" v-for="color in subColor" :style="{ backgroundColor: color.color }" @click="handleColor(color)"></div>
    </div>
  </div>
</template>

<script lang="ts" setup name="vp-color-preview">
  import { PropType, computed } from 'vue'
  interface ColorType {
    color: string
    text: string
    hex: string
  }

  const props = defineProps({
    mode: {
      type: String as PropType<'group' | 'single'>,
      default: 'single'
    },
    colors: {
      type: Array as PropType<ColorType[]>
    }
  })

  const baseColor = computed(() => props.colors?.[0])
  const subColor = computed(() => {
    const [baseColor, ...rest ] = props.colors || [];
    return rest;
  })

  const handleColor = (color: ColorType) => {
    console.log(color);
    
  }
</script>

<style lang="less" scoped>
  .vp-color-preview {
  }
</style>
