import { ComponentSize } from '@fzui/hooks';

export interface InstallOptions {
  size: ComponentSize | '';
  zIndex: number;
  locale?: any;
}

let $FZUI = {} as InstallOptions;

const setConfig = (option: InstallOptions): void => {
  $FZUI = option;
};

const getConfig = (key: keyof InstallOptions): unknown => {
  return $FZUI[key];
};

export { getConfig, setConfig };
