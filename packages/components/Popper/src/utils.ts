import type { ComponentPublicInstance } from 'vue';
import type { PopperCoreConfigProps, Measurable } from './Popper';

type ArrowProps = {
  arrowEl: HTMLElement | null;
  arrowOffset: number | undefined;
};

function genModifiers(options: PopperCoreConfigProps) {
  const { offset, gpuAcceleration, fallbackPlacements } = options;
  return [
    {
      name: 'offset',
      options: {
        offset: [0, offset ?? 12],
      },
    },
    {
      name: 'preventOverflow',
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5,
        },
      },
    },
    {
      name: 'flip',
      options: {
        padding: 5,
        fallbackPlacements: fallbackPlacements ?? [],
      },
    },
    {
      name: 'computeStyles',
      options: {
        gpuAcceleration,
        adaptive: gpuAcceleration,
      },
    },
  ];
}

function attachArrow(options: any, { arrowEl, arrowOffset }: ArrowProps) {
  options.modifiers.push({
    name: 'arrow',
    options: {
      element: arrowEl,
      padding: arrowOffset ?? 5,
    },
  } as any);
}

function deriveExtraModifiers(options: any, modifiers: PopperCoreConfigProps['popperOptions']['modifiers']) {
  if (modifiers) {
    options.modifiers = [...options.modifiers, ...(modifiers ?? [])];
  }
}

export const buildPopperOptions = (props: PopperCoreConfigProps, arrowProps: ArrowProps) => {
  const { placement, strategy, popperOptions } = props;
  const options = {
    placement,
    strategy,
    ...popperOptions,
    modifiers: genModifiers(props),
  };

  attachArrow(options, arrowProps);
  deriveExtraModifiers(options, popperOptions?.modifiers);
  return options;
};

export const unwrapMeasurableEl = ($el?: HTMLElement | Measurable | null) => {
  let el: HTMLElement | null = null;
  if (!$el) {
    return null;
  }

  if ('getBoundingClientRect' in $el || ($el as any) instanceof HTMLElement) {
    el = $el as HTMLElement;
  } else {
    // refs can be Vue component
    el = ($el as any as ComponentPublicInstance).$el;
  }
  return el;
};
