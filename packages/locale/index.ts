export type TranslatePair = {
  [key: string]: string | string[] | TranslatePair;
};

export type Language = {
  name: string;
  fz: TranslatePair;
};

import enUs from './lang/en-us';
import zhCn from './lang/zh-cn';
import zhTw from './lang/zh-tw';

export { enUs, zhCn, zhTw };
