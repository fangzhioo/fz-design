import { ExtractPropTypes } from 'vue';
import type Breadcrumb from './Breadcrumb.vue';

export const breadcrumbEmits = {};

export const breadcrumbProps = {
  separator: {
    type: String,
    default: '/',
  },
  separatorIcon: {
    type: String,
    default: '',
  },
};

export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>;
export type BreadcrumbEmits = typeof breadcrumbEmits;
export type BreadcrumbInstance = InstanceType<typeof Breadcrumb>;
