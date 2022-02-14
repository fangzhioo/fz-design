import { get } from '@fzui/utils/lodash';
import type { Language } from '@fzui/locale';
import ZH_CN from '@fzui/locale/lang/zh-cn';
import { FZ_LOCALE_INJECT_KEY } from '@fzui/constants';
import { computed, inject, provide, ref, Ref, unref } from 'vue';
import { MaybeRef } from '@vueuse/core';
import { useProp } from './use-prop';

// 默认简体中文
const defaultLanguage = ZH_CN;

export type TranslatorOption = Record<string, string | number>;
export type Translator = (path: string, option?: TranslatorOption) => string;
export type LocaleContext = {
  locale: Ref<Language>;
  lang: Ref<string>;
  t: Translator;
};

let cache: LocaleContext;

export const translate = (path: string, option: undefined | TranslatorOption, locale: Language): string =>
  (get(locale, path, path) as string).replace(/\{(\w+)\}/g, (_, key) => `${option?.[key] ?? `{${key}}`}`);

export const buildTranslator =
  (locale: MaybeRef<Language>): Translator =>
  (path, option) =>
    translate(path, option, unref(locale));

export const localeProviderMaker = (locale = defaultLanguage) => {
  const lang = ref(locale.name);
  const localeRef = ref(locale);
  return {
    lang,
    locale: localeRef,
    t: buildTranslator(localeRef),
  };
};

export const useLocale = () => {
  return inject<LocaleContext>(FZ_LOCALE_INJECT_KEY, cache || localeProviderMaker(defaultLanguage));
};

export const provideLocale = () => {
  const propLocale = useProp<Language>('locale');
  const locale = computed(() => propLocale.value || defaultLanguage);
  const lang = computed(() => locale.value.name);

  const t = buildTranslator(locale);
  const provides: LocaleContext = {
    locale,
    lang,
    t,
  };

  // this could be broken if someone tries to do following:

  /**
   * <config-provider :locale="lang1">
   *   <config-provider :locale="lang2">
   *     Something calls modal component.
   *   </config-provider>
   * </config-provider>
   */
  cache = provides;
  provide(FZ_LOCALE_INJECT_KEY, provides);
};
