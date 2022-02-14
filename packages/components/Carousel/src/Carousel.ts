import { CHANGE_EVENT } from '@fzui/constants';
import { ExtractPropTypes, PropType } from 'vue';
import type Carousel from './Carousel.vue';

export type CarouselTrigger = 'hover' | 'click';
export type CarouselDirection = 'horizontal' | 'vertical';
export type CarouselIndicatorPosition = 'outside' | 'none';

export const carouselEmits = [CHANGE_EVENT];

export const carouselProps = {
  initialIndex: {
    type: Number,
    default: 0,
  },
  height: {
    type: String,
    default: '',
  },
  trigger: {
    type: String as PropType<CarouselTrigger>,
    default: 'hover',
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  interval: {
    type: Number,
    default: 3000,
  },
  indicatorPosition: {
    type: String as PropType<CarouselIndicatorPosition>,
    default: '',
  },
  indicator: {
    type: Boolean,
    default: true,
  },
  arrow: {
    type: String,
    default: 'hover',
  },
  type: { type: String, default: '' },
  loop: {
    type: Boolean,
    default: true,
  },
  direction: {
    type: String as PropType<CarouselDirection>,
    default: 'horizontal',
    validator(val: string) {
      return ['horizontal', 'vertical'].includes(val);
    },
  },
  pauseOnHover: {
    type: Boolean,
    default: true,
  },
};

export type CarouselProps = ExtractPropTypes<typeof carouselProps>;
export type CarouselEmits = typeof carouselEmits;
export type CarouselInstance = InstanceType<typeof Carousel>;
