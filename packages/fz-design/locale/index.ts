export interface TranslatePair {
  [key: string]: string | string[] | TranslatePair;
}

export interface Language {
  name: string;
  fz: TranslatePair;
}

export { default as enUs } from './lang/en-us'
export { default as zhCn } from './lang/zh-cn'
