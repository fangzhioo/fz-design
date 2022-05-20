// 拓展 https://tiptap.dev/extensions 带星号【*】表示拓展必须有！
// IDEA 💡 可以使用web-component实现更多的可能！！！ https://v3.cn.vuejs.org/guide/web-components.html#%E5%9C%A8-vue-%E4%B8%AD%E4%BD%BF%E7%94%A8%E8%87%AA%E5%AE%9A%E4%B9%89%E5%85%83%E7%B4%A0
import { Extension } from '@tiptap/core';
// 【*】document 整个编辑器容器
import Document from '@tiptap/extension-document';
// 【*】text 纯文本
import Text from '@tiptap/extension-text';
// 【*】gap 光标
import Gapcursor from '@tiptap/extension-gapcursor';
// blockquote
import Blockquote, { BlockquoteOptions } from '@tiptap/extension-blockquote';
// drop 元素拖拽
import Dropcursor, { DropcursorOptions } from '@tiptap/extension-dropcursor';
// bardbreak 硬换行
import HardBreak, { HardBreakOptions } from '@tiptap/extension-hard-break';
// horizontal-rule 水平分割线
import HorizontalRule, { HorizontalRuleOptions } from '@tiptap/extension-horizontal-rule';
// list
import { BulletList, OrderedList, ListItem, TaskItem, TaskList } from './ListExtension';
import type { BulletListOptions, OrderedListOptions, ListItemOptions, TaskItemOptions, TaskListOptions } from './ListExtension';
// heading/paragraph 标题和段落
import { Heading, Paragraph } from './HeadingParagraphExtension';
import type { HeadingOptions, ParagraphOptions } from './HeadingParagraphExtension';
// history
import { History } from './HistoryExtension';
import type { HistoryOptions } from './HistoryExtension';
// code
import { CodeBlock } from './CodeBlockExtension';
import type { CodeBlockOptions } from './CodeBlockExtension';
// text-align
import { TextAlign } from './TextAlignExtension';
import type { TextAlignOptions } from './TextAlignExtension';
// marks
import { Bold, Italic, Strike, Highlight, Code } from './MarksExtension';
import type { BoldOptions, ItalicOptions, StrikeOptions, HighlightOptions, CodeOptions } from './MarksExtension';
// table
import { Table, TableCell, TableRow, TableHeader } from './TableExtension';
import type { TableOptions, TableCellOptions, TableRowOptions, TableHeaderOptions } from './TableExtension';
// image
import { Image } from './ImageExtension';
import type { ImageOptions } from './ImageExtension';

export interface StarterKitOptions {
  document: false;
  text: false;
  gapcursor: false;

  bold: Partial<BoldOptions> | false;
  italic: Partial<ItalicOptions> | false;
  strike: Partial<StrikeOptions> | false;
  code: Partial<CodeOptions> | false;

  blockquote: Partial<BlockquoteOptions> | false;

  bulletList: Partial<BulletListOptions> | false;
  orderedList: Partial<OrderedListOptions> | false;
  listItem: Partial<ListItemOptions> | false;
  taskList: Partial<TaskListOptions | false>;
  taskItem: Partial<TaskItemOptions | false>;

  codeBlock: Partial<CodeBlockOptions> | false;

  dropcursor: Partial<DropcursorOptions> | false;

  hardBreak: Partial<HardBreakOptions> | false;

  heading: Partial<HeadingOptions> | false;

  history: Partial<HistoryOptions> | false;

  horizontalRule: Partial<HorizontalRuleOptions> | false;

  paragraph: Partial<ParagraphOptions> | false;

  // text-align
  textAlign: Partial<TextAlignOptions> | false;

  // highlight
  highlight: Partial<HighlightOptions> | false;

  // table
  table: Partial<TableOptions> | false;
  tableCell: Partial<TableCellOptions> | false;
  tableRow: Partial<TableRowOptions> | false;
  tableHeader: Partial<TableHeaderOptions> | false;

  // image
  image: Partial<ImageOptions> | false;
}

export const StarterKit = Extension.create<StarterKitOptions>({
  name: 'starterKit',

  addExtensions() {
    const extensions = [];

    // text-align
    if (this.options.textAlign !== false) {
      const textAlignTypes = ['heading', 'paragraph'];
      if (this.options.image !== false) {
        textAlignTypes.push('image');
      }
      extensions.push(
        TextAlign.configure({
          types: textAlignTypes,
          ...this.options?.textAlign,
        }),
      );
    }

    // highlight
    if (this.options.highlight !== false) {
      extensions.push(Highlight);
    }

    // table
    if (this.options.table !== false) {
      extensions.push(
        Table.configure({
          resizable: true,
          // HTMLAttributes: {
          //   class: 'fz-rich-editor__dom--table',
          // },
          ...this.options?.table,
        }),
      );

      if (this.options.tableCell !== false) {
        extensions.push(TableCell.configure(this.options?.tableCell));
      }
      if (this.options.tableRow !== false) {
        extensions.push(TableRow.configure(this.options?.tableRow));
      }
      if (this.options.tableHeader !== false) {
        extensions.push(TableHeader.configure(this.options?.tableHeader));
      }
    }

    // image
    if (this.options.image !== false) {
      extensions.push(
        Image.configure({
          inline: true,
          allowBase64: true,
          ...this.options?.image,
        }),
      );
    }

    if (this.options.blockquote !== false) {
      extensions.push(
        Blockquote.configure({
          // HTMLAttributes: {
          //   class: 'fz-rich-editor__dom--blockquote',
          // },
          ...this.options?.blockquote,
        }),
      );
    }

    if (this.options.bold !== false) {
      extensions.push(
        Bold.configure({
          // HTMLAttributes: {
          //   class: 'fz-rich-editor__dom--blockquote',
          // },
          ...this.options?.bold,
        }),
      );
    }

    if (this.options.bulletList !== false) {
      extensions.push(
        BulletList.configure({
          // HTMLAttributes: {
          //   class: 'fz-rich-editor__dom--bulletlist',
          // },
          ...this.options?.bulletList,
        }),
      );
    }

    if (this.options.orderedList !== false) {
      extensions.push(
        OrderedList.configure({
          // HTMLAttributes: {
          //   class: 'fz-rich-editor__dom--orderedlist',
          // },
          ...this.options?.orderedList,
        }),
      );
    }

    if (this.options.listItem !== false) {
      extensions.push(ListItem.configure(this.options?.listItem));
    }

    if (this.options.taskList !== false) {
      extensions.push(TaskList.configure(this.options?.taskList));
    }

    if (this.options.taskItem !== false) {
      extensions.push(
        TaskItem.configure({
          nested: true,
          ...this.options?.taskItem,
        }),
      );
    }

    if (this.options.code !== false) {
      extensions.push(
        Code.configure({
          // HTMLAttributes: {
          //   class: 'fz-rich-editor__dom--code',
          // },
          ...this.options?.code,
        }),
      );
    }

    if (this.options.codeBlock !== false) {
      extensions.push(
        CodeBlock.configure({
          // HTMLAttributes: {
          //   class: 'fz-rich-editor__dom--codeblock',
          // },
          ...this.options?.codeBlock,
        }),
      );
    }

    if (this.options.document !== false) {
      extensions.push(Document);
    }

    if (this.options.dropcursor !== false) {
      extensions.push(
        Dropcursor.configure({
          ...this.options?.dropcursor,
        }),
      );
    }

    if (this.options.gapcursor !== false) {
      extensions.push(Gapcursor);
    }

    if (this.options.hardBreak !== false) {
      extensions.push(HardBreak.configure(this.options?.hardBreak));
    }

    if (this.options.heading !== false) {
      extensions.push(Heading.configure(this.options?.heading));
    }

    if (this.options.history !== false) {
      extensions.push(History.configure(this.options?.history));
    }

    if (this.options.horizontalRule !== false) {
      extensions.push(
        HorizontalRule.configure({
          // HTMLAttributes: {
          //   class: 'fz-rich-editor__dom--horizontalrule',
          // },
          ...this.options?.horizontalRule,
        }),
      );
    }

    if (this.options.italic !== false) {
      extensions.push(
        Italic.configure({
          // HTMLAttributes: {
          //   class: 'fz-rich-editor__dom--italic',
          // },
          ...this.options?.italic,
        }),
      );
    }

    if (this.options.paragraph !== false) {
      extensions.push(
        Paragraph.configure({
          // HTMLAttributes: {
          //   class: 'fz-rich-editor__dom--paragraph',
          // },
          ...this.options?.paragraph,
        }),
      );
    }

    if (this.options.strike !== false) {
      extensions.push(
        Strike.configure({
          // HTMLAttributes: {
          //   class: 'fz-rich-editor__dom--strike',
          // },
          ...this.options?.strike,
        }),
      );
    }

    if (this.options.text !== false) {
      extensions.push(Text.configure(this.options?.text));
    }

    return extensions;
  },
});
