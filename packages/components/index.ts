/**
 * !--------- FBI WARNING ----------!
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
import { App, Plugin } from 'vue';

import { ButtonPlugin } from './Button';
import { InputPlugin } from './Input';
import { ConfigProviderPlugin } from './ConfigProvider';
import { ContainerPlugin } from './Container';
import { AffixPlugin } from './Affix';
import { IconPlugin } from './Icon';
import { PopperPlugin } from './Popper';
import { PopoverPlugin } from './Popover';

const FzUIPlugin: Plugin = {
  install(app: App) {
    ButtonPlugin.install?.(app);
    InputPlugin.install?.(app);
    ConfigProviderPlugin.install?.(app);
    ContainerPlugin.install?.(app);
    AffixPlugin.install?.(app);
    IconPlugin.install?.(app);
    PopperPlugin.install?.(app);
    PopoverPlugin.install?.(app);
  },
};

export default FzUIPlugin;

export * from './Button';
export * from './Input';
export * from './ConfigProvider';
export * from './Container';
export * from './Affix';
export * from './Icon';
export * from './Popper';
export * from './Popover';
