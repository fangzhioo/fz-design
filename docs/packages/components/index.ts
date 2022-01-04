/**
 * !--------- FBI WARNING ----------!
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
import { App, Plugin } from 'vue';

import { ButtonPlugin } from './Button';
import { InputPlugin } from './Input';
import { ConfigProviderPlugin } from './ConfigProvider';
import { ContainerPlugin } from './Container';

const FzUIPlugin: Plugin = {
  install(app: App) {
    ButtonPlugin.install?.(app);
    InputPlugin.install?.(app);
    ConfigProviderPlugin.install?.(app);
    ContainerPlugin.install?.(app);
  },
};

export default FzUIPlugin;

export * from './Button';
export * from './Input';
export * from './ConfigProvider';
export * from './Container';