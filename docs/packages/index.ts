// TODO 作为packages的主入口！！！
import FzUIPlugin from './components';

// less
import './theme/index.less';

export * from './directives';
export * from './hooks';
export * from './constants';
export * from './locale';

export const install = FzUIPlugin.install;
export const version = '0.0.14';
