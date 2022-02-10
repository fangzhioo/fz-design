// TODO 作为packages的主入口！！！
import FzUIPlugin from './components';

export * from './directives';
export * from './hooks';
export * from './utils/constants';

export const install = FzUIPlugin.install;
export const version = '0.0.11';
