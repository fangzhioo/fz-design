import { unref } from 'vue';
import type { Ref } from 'vue';
import { isArray } from '@fzui/utils';
import type { Trigger } from './Tooltip';

export const isTriggerType = (trigger: Trigger | Trigger[], type: Trigger) => {
  if (isArray(trigger)) {
    return trigger.includes(type);
  }
  return trigger === type;
};

export const whenTrigger = (trigger: Ref<Trigger | Trigger[]>, type: Trigger, handler: (e: Event) => void) => {
  return (e: Event) => {
    if (isTriggerType(unref(trigger), type)) {
      handler(e);
    }
  };
};
