// https://tiptap.dev/api/marks
import BoldExtension from '@tiptap/extension-bold';
import StrikeExtension from '@tiptap/extension-strike';
import ItalicExtension from '@tiptap/extension-italic';
import HighlightExtension from '@tiptap/extension-highlight';
import CodeExtension from '@tiptap/extension-code';

export type { BoldOptions } from '@tiptap/extension-bold';
export type { StrikeOptions } from '@tiptap/extension-strike';
export type { ItalicOptions } from '@tiptap/extension-italic';
export type { CodeOptions } from '@tiptap/extension-code';
export type { HighlightOptions } from '@tiptap/extension-highlight';

export const Bold = BoldExtension;
export const Strike = StrikeExtension;
export const Italic = ItalicExtension;
export const Code = CodeExtension;
export const Highlight = HighlightExtension;
