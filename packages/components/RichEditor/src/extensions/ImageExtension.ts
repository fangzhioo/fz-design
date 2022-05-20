// https://tiptap.dev/api/nodes/image

import ImageExtension, { ImageOptions as ExtensionImageOptions } from '@tiptap/extension-image';
import { AnyFunction } from '@fzui/utils';

export interface ImageState {
  src: string;
  alt: string;
  title: string;
}

export interface ImageOptions extends ExtensionImageOptions {
  beforeInsert?: AnyFunction<Promise<ImageState> | ImageState>;
}

export const Image = ImageExtension;
