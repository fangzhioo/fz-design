import type { Component } from 'vue'

export type { ImagePreviewProps } from './props'

export interface ImageViewerMode {
  name: string
  icon: Component
}

export type ImageViewerAction = 'zoomIn' | 'zoomOut' | 'clockwise' | 'anticlockwise'
