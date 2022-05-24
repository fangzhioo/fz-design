// 基础拓展，且必要的部分
// 【*】document 整个编辑器容器
import DocumentExtension from '@tiptap/extension-document';
// 【*】text 纯文本
import TextExtension from '@tiptap/extension-text';
// 【*】gap 光标
import GapcursorExtension from '@tiptap/extension-gapcursor';

export const Document = DocumentExtension;
export const Text = TextExtension;
export const Gapcursor = GapcursorExtension;
