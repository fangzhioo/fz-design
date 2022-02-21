// TODO 作为packages的主入口！！！
import FzUIPlugin from './components';
import { version } from '../package.json';

// less
import './theme/index.less';

export * from './directives';
export * from './hooks';
export * from './constants';
export * from './locale';

const install = FzUIPlugin.install;

export default {
  install,
  version,
};
