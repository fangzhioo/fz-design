// https://tiptap.dev/api/nodes/table
import TableExtension from '@tiptap/extension-table';
import TableRowExtension from '@tiptap/extension-table-row';
import TableCellExtension from '@tiptap/extension-table-cell';
import TableHeaderExtension from '@tiptap/extension-table-header';

export type { TableOptions } from '@tiptap/extension-table';
export type { TableRowOptions } from '@tiptap/extension-table-row';
export type { TableCellOptions } from '@tiptap/extension-table-cell';
export type { TableHeaderOptions } from '@tiptap/extension-table-header';

export const TableCell = TableCellExtension.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),

      // and add a new one …
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-background-color'),
        renderHTML: (attributes) => {
          return {
            'data-background-color': attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});

export const Table = TableExtension;
export const TableRow = TableRowExtension;
export const TableHeader = TableHeaderExtension;
