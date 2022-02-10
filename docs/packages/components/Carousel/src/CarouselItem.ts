import { ExtractPropTypes, ToRefs } from 'vue';
// import CarouselItem from './CarouselItem.vue';

export interface ICarouselItemProps {
  name: string;
  label: string | number;
  key: string;
}

export interface ICarouselItemData {
  hover: boolean;
  translate: number;
  scale: number;
  active: boolean;
  ready: boolean;
  inStage: boolean;
  animating: boolean;
}

export interface ICarouselProps {
  initialIndex: number;
  height: string;
  trigger: string;
  autoplay: boolean;
  interval: number;
  indicatorPosition: string;
  indicator: boolean;
  arrow: string;
  type: string;
  loop: boolean;
  direction: string;
  pauseOnHover: boolean;
}

export type UnionCarouselItemData = ICarouselItemProps & ToRefs<ICarouselItemData>;

export interface CarouselItem extends UnionCarouselItemData {
  uid: number;
  translateItem: (index: number, activeIndex: number, oldIndex: number) => void;
}

export const carouselItemProps = {
  name: {
    type: String,
    default: '',
  },
  label: {
    type: [String, Number],
    default: '',
  },
};

export const carouselItemEmits = {};

export type CarouselItemProps = ExtractPropTypes<typeof carouselItemProps>;
export type CarouselItemEmits = typeof carouselItemEmits;
// export type CarouselItemInstance = InstanceType<typeof CarouselItem>;
