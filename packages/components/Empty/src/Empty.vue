<template>
  <div class="fz-empty">
    <div class="fz-empty__image" :style="imageStyle">
      <img v-if="image" :src="image" ondragstart="return false" />
      <slot v-else name="image">
        <img-empty />
      </slot>
    </div>
    <div class="fz-empty__description">
      <slot v-if="$slots.description" name="description" />
      <p v-else>{{ emptyDescription }}</p>
    </div>
    <div v-if="$slots.default" class="fz-empty__bottom">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { useLocale } from '@fzui/hooks';
import { computed, CSSProperties, defineComponent } from 'vue';
import ImgEmpty from './ImgEmpty.vue';
import { emptyProps } from './Empty';

export default defineComponent({
  name: 'FzEmpty',
  components: { ImgEmpty },
  props: emptyProps,
  setup(props) {
    const { t } = useLocale();
    const emptyDescription = computed(() => props.description || t('fz.table.emptyText'));
    const imageStyle = computed<CSSProperties>(() => ({
      width: props.imageSize ? `${props.imageSize}px` : '',
    }));

    return {
      emptyDescription,
      imageStyle,
    };
  },
});
</script>
