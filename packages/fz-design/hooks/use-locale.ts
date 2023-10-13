import { computed, ref, unref, isRef } from 'vue';
import { useGlobalConfig } from './use-global-config';
import { zhCn } from '../locale';
import { get } from '../utils';
import type { MaybeRef } from '../types';
import type { Ref } from 'vue';
import type { Language } from '../locale';

export type TranslatorOption = Record<string, string | number>;
export type Translator = (path: string, option?: TranslatorOption) => string;
export interface LocaleContext {
  locale: Ref<Language>;
  lang: Ref<string>;
  t: Translator;
}
export const translate = (path: string, option: undefined | TranslatorOption, locale: Language): string =>
  (get(locale, path, path) as string).replace(/\{(\w+)\}/g, (_, key) => `${option?.[key] ?? `{${key}}`}`);

export const buildTranslator =
  (locale: MaybeRef<Language>): Translator =>
  (path, option) =>
    translate(path, option, unref(locale));

export const buildLocaleContext = (locale: MaybeRef<Language>): LocaleContext => {
  const lang = computed(() => unref(locale).name);
  const localeRef = isRef(locale) ? locale : ref(locale);
  return {
    lang,
    locale: localeRef,
    t: buildTranslator(locale)
  };
};

export const useLocale = (): LocaleContext => {
  const locale = useGlobalConfig('locale');
  return buildLocaleContext(computed(() => locale.value || zhCn));
};
