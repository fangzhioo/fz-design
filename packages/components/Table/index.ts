import { App, Plugin } from 'vue';
import Table from './src/Table.vue';
import TableColumn from './src/table-column';

export const TablePlugin: Plugin = {
  install(app: App) {
    app.component(Table.name, Table);
    app.component(TableColumn.name, TableColumn);
  },
};

export { Table, TableColumn };
