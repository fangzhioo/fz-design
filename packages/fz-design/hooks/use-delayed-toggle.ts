import { unref } from 'vue'
import { useTimeout } from './use-timeout'

import type { ExtractPropTypes, ToRefs } from 'vue'
import { isNumber } from '../utils'

export const useDelayedToggleProps = {
  /**
   * @description delay of appearance, in millisecond
   */
  showAfter: {
    type: Number,
    default: 0
  },
  /**
   * @description delay of disappear, in millisecond
   */
  hideAfter: {
    type: Number,
    default: 200
  },
  /**
   * @description disappear automatically, in millisecond
   */
  autoClose: {
    type: Number,
    default: 0
  }
} as const

export type UseDelayedToggleProps = {
  open: (event?: Event) => void
  close: (event?: Event) => void
} & ToRefs<ExtractPropTypes<typeof useDelayedToggleProps>>

export const useDelayedToggle = ({
  showAfter,
  hideAfter,
  autoClose,
  open,
  close
}: UseDelayedToggleProps): any => {
  const { registerTimeout } = useTimeout()
  const {
    registerTimeout: registerTimeoutForAutoClose,
    cancelTimeout: cancelTimeoutForAutoClose
  } = useTimeout()

  const onOpen = (event?: Event): void => {
    registerTimeout(() => {
      open(event)

      const _autoClose = unref(autoClose)
      if (isNumber(_autoClose) && _autoClose > 0) {
        registerTimeoutForAutoClose(() => {
          close(event)
        }, _autoClose)
      }
    }, unref(showAfter))
  }

  const onClose = (event?: Event): void => {
    cancelTimeoutForAutoClose()

    registerTimeout(() => {
      close(event)
    }, unref(hideAfter))
  }

  return {
    onOpen,
    onClose
  }
}
