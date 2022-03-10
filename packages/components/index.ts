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
import { AutocompletePlugin } from './Autocomplete';
import { AlertPlugin } from './Alert';
import { AvatarPlugin } from './Avatar';
import { BacktopPlugin } from './Backtop';
import { BadgePlugin } from './Badge';
import { BreadcrumbPlugin } from './Breadcrumb';
import { ScrollbarPlugin } from './Scrollbar';
import { CheckboxPlugin } from './Checkbox';
import { CalendarPlugin } from './Calendar';
import { CardPlugin } from './Card';
import { LayoutPlugin } from './Layout';
import { CarouselPlugin } from './Carousel';
import { MessagePlugin } from './Message';
import { CheckTagPlugin } from './CheckTag';
import { CollapsePlugin } from './Collapse';
import { TooltipPlugin } from './Tooltip';
import { OnlyChildPlugin } from './OnlyChild';
import { VisuallyHiddenPlugin } from './VisuallyHidden';
import { TagPlugin } from './Tag';
import { SelectPlugin } from './Select';
import { OverlayPlugin } from './Overlay';
import { DialogPlugin } from './Dialog';
import { TablePlugin } from './Table';
import { ColorPickerPlugin } from './ColorPicker';
import { RadioPlugin } from './Radio';
import { DrawerPlugin } from './Drawer';

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
    AutocompletePlugin.install?.(app);
    AlertPlugin.install?.(app);
    AvatarPlugin.install?.(app);
    BacktopPlugin.install?.(app);
    BadgePlugin.install?.(app);
    BreadcrumbPlugin.install?.(app);
    ScrollbarPlugin.install?.(app);
    CheckboxPlugin.install?.(app);
    CalendarPlugin.install?.(app);
    CardPlugin.install?.(app);
    LayoutPlugin.install?.(app);
    CarouselPlugin.install?.(app);
    MessagePlugin.install?.(app);
    CheckTagPlugin.install?.(app);
    CollapsePlugin.install?.(app);
    TooltipPlugin.install?.(app);
    OnlyChildPlugin.install?.(app);
    VisuallyHiddenPlugin.install?.(app);
    TagPlugin.install?.(app);
    SelectPlugin.install?.(app);
    OverlayPlugin.install?.(app);
    DialogPlugin.install?.(app);
    TablePlugin.install?.(app);
    ColorPickerPlugin.install?.(app);
    RadioPlugin.install?.(app);
    DrawerPlugin.install?.(app);
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
export * from './Autocomplete';
export * from './Alert';
export * from './Avatar';
export * from './Backtop';
export * from './Badge';
export * from './Breadcrumb';
export * from './Scrollbar';
export * from './Checkbox';
export * from './Calendar';
export * from './Card';
export * from './Layout';
export * from './Carousel';
export * from './Message';
export * from './CheckTag';
export * from './Collapse';
export * from './Tooltip';
export * from './OnlyChild';
export * from './VisuallyHidden';
export * from './Tag';
export * from './Select';
export * from './Overlay';
export * from './Dialog';
export * from './Table';
export * from './ColorPicker';
export * from './Radio';
export * from './Drawer';
