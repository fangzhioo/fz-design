import { ExtractPropTypes, PropType } from 'vue';

import type ImageViewer from './ImageViewer.vue';

export interface ImageViewerMode {
  name: string;
  icon: string;
}

export type ImageViewerAction = 'zoomIn' | 'zoomOut' | 'clockwise' | 'anticlockwise';

export const ModesMenus: Record<'CONTAIN' | 'ORIGINAL', ImageViewerMode> = {
  CONTAIN: {
    name: 'contain',
    icon: 'fullscreen-expand',
  },
  ORIGINAL: {
    name: 'original',
    icon: 'fullscreen-shrink',
  },
};

export const imageViewerProps = {
  urlList: {
    type: Array as PropType<string[]>,
    default: () => [],
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
  hideOnClickModal: {
    type: Boolean,
    default: false,
  },
  teleported: {
    type: Boolean,
    default: false,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
};

export const imageViewerEmits = {
  close: () => true,
  switch: (index: number) => typeof index === 'number',
};

export type ImageViewerProps = ExtractPropTypes<typeof imageViewerProps>;
export type ImageViewerEmits = typeof imageViewerEmits;
export type ImageViewerInstance = InstanceType<typeof ImageViewer>;
