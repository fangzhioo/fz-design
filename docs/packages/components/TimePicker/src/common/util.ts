import dayjs from 'dayjs';

import type { Dayjs } from 'dayjs';
import { isEmpty } from '@fzui/utils';

export interface PickerOptions {
  isValidValue: (date: Dayjs | undefined) => boolean;
  handleKeydown: (event: KeyboardEvent) => void;
  parseUserInput: (value: Dayjs | undefined) => dayjs.Dayjs;
  formatToString: (value: Dayjs | undefined) => string | string[];
  getRangeAvailableTime: (date: Dayjs | undefined) => dayjs.Dayjs;
  getDefaultValue: () => Dayjs;
  panelReady: boolean;
  handleClear: () => void;
}

// Date object and string
export const dateEquals = (a: Date | any, b: Date | any) => {
  const aIsDate = a instanceof Date;
  const bIsDate = b instanceof Date;
  if (aIsDate && bIsDate) {
    return a.getTime() === b.getTime();
  }
  if (!aIsDate && !bIsDate) {
    return a === b;
  }
  return false;
};

export const valueEquals = (a: Array<Date> | any, b: Array<Date> | any) => {
  const aIsArray = Array.isArray(a);
  const bIsArray = Array.isArray(b);
  if (aIsArray && bIsArray) {
    if (a.length !== b.length) {
      return false;
    }
    return (a as Array<Date>).every((item, index) => dateEquals(item, b[index]));
  }
  if (!aIsArray && !bIsArray) {
    return dateEquals(a, b);
  }
  return false;
};

export const parser = (date: string | number | Date, format: string | undefined, lang: string): Dayjs | undefined => {
  const day = isEmpty(format) || format === 'x' ? dayjs(date).locale(lang) : dayjs(date, format).locale(lang);
  return day.isValid() ? day : undefined;
};

export const formatter = (date: string | number | Date, format: string | undefined, lang: string) => {
  if (isEmpty(format)) {
    return date;
  }
  if (format === 'x') {
    return Number(date);
  }
  return dayjs(date).locale(lang).format(format);
};

// other
export const rangeArr = (n: number) => Array.from(Array.from({ length: n }).keys());

export const extractDateFormat = (format: string) => {
  return format
    .replace(/\W?m{1,2}|\W?ZZ/g, '')
    .replace(/\W?h{1,2}|\W?s{1,3}|\W?a/gi, '')
    .trim();
};

export const extractTimeFormat = (format: string) => {
  return format.replace(/\W?D{1,2}|\W?Do|\W?d{1,4}|\W?M{1,4}|\W?Y{2,4}/g, '').trim();
};
