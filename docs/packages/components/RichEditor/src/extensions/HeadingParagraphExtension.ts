// heading/paragraph 标题和段落
import HeadingExtension from '@tiptap/extension-heading';
import ParagraphExtension from '@tiptap/extension-paragraph';

export type { HeadingOptions, Level } from '@tiptap/extension-heading';
export type { ParagraphOptions } from '@tiptap/extension-paragraph';

export const Heading = HeadingExtension;
export const Paragraph = ParagraphExtension;
