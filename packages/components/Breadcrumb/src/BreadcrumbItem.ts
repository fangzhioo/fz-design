import { ExtractPropTypes, PropType } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import type BreadcrumbItem from './BreadcrumbItem.vue';

export const breadcrumbItemEmits = {};

export const breadcrumbItemProps = {
  to: {
    type: [String, Object] as PropType<RouteLocationRaw>,
    default: '',
  },
  replace: {
    type: Boolean,
    default: false,
  },
};

export type BreadcrumbItemProps = ExtractPropTypes<typeof breadcrumbItemProps>;
export type BreadcrumbItemEmits = typeof breadcrumbItemEmits;
export type BreadcrumbItemInstance = InstanceType<typeof BreadcrumbItem>;
