export type { TagProps } from './props'

import type { ComponentSize } from '../../../types'

export type TagType =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'info'
  | 'error'
  | ''

export type TagSize = ComponentSize

export type TagTheme = 'dark' | 'light' | 'plain';
