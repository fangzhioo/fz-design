import { isNumber } from '@fzui/utils';
import { ExtractPropTypes, PropType } from 'vue';
import type Image from './Image.vue';

export type ImageFitType = '' | 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

export const imageProps = {
  hideOnClickModal: {
    type: Boolean,
    default: false,
  },
  src: {
    type: String,
    default: '',
  },
  fit: {
    type: String as PropType<ImageFitType>,
    default: '',
  },
  lazy: {
    type: Boolean,
    default: false,
  },
  scrollContainer: {
    type: [String, Object] as PropType<string | HTMLElement | undefined>,
  },
  previewSrcList: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  previewTeleported: {
    type: Boolean,
    default: false,
  },
  zIndex: {
    type: Number,
  },
  initialIndex: {
    type: Number,
    default: 0,
  },
  infinite: {
    type: Boolean,
    default: true,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
};

export const imageEmits = {
  error: (evt: Event) => evt instanceof Event,
  switch: (val: number) => isNumber(val),
  close: () => true,
};

export type ImageProps = ExtractPropTypes<typeof imageProps>;
export type ImageEmits = typeof imageEmits;
export type ImageInstance = InstanceType<typeof Image>;
