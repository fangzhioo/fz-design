<script lang="ts" setup>
  import type {
    CSSProperties,
    StyleValue,
    VNode,
    VNodeArrayChildren,
    VNodeNormalizedChildren
  } from 'vue'
  import {
    computed,
    createTextVNode,
    createVNode,
    isVNode,
    ref,
    renderSlot,
    watchEffect
  } from 'vue'
  import { Props } from './props'
  import { isArray, isFragment, isNumber, isValidElementNode } from '../../../utils'
  import { PatchFlags } from '../../../constants'

  const SIZE_MAP = {
    small: 8,
    default: 12,
    large: 16
  } as any

  defineOptions({ name: 'FzSpace' })

  const props = defineProps(Props)
  const slots = defineSlots()

  const classes = computed(() => [
    'fz-space',
    { [`fz-space--${props.direction}`]: props.direction },
    props.class
  ])

  const horizontalSize = ref(0)
  const verticalSize = ref(0)

  const containerStyle = computed<StyleValue>(() => {
    const wrapKls: CSSProperties =
      props.wrap || props.fill
        ? { flexWrap: 'wrap', marginBottom: `-${verticalSize.value}px` }
        : {}
    const alignment: CSSProperties = {
      alignItems: props.alignment
    }
    return [wrapKls, alignment, props.style]
  })

  const itemStyle = computed<StyleValue>(() => {
    const itemBaseStyle: CSSProperties = {
      paddingBottom: `${verticalSize.value}px`,
      marginRight: `${horizontalSize.value}px`
    }

    const fillStyle: CSSProperties = props.fill
      ? { flexGrow: 1, minWidth: `${props.fillRatio}%` }
      : {}

    return [itemBaseStyle, fillStyle]
  })

  // retrieve the children out via a simple for loop
  // the edge case here is that when users uses directives like <v-for>, <v-if>
  // we need to go deeper until the child is not the Fragment type
  function extractChildren (
    children: VNodeArrayChildren,
    parentKey = '',
    extractedChildren: VNode[] = []
  ): VNode[] {
    const itemClass = `${props.prefixCls || 'fz-space'}__item`
    children.forEach((child, loopKey) => {
      if (isFragment(child)) {
        if (isArray(child.children)) {
          child.children.forEach((nested, key) => {
            if (isFragment(nested) && isArray(nested.children)) {
              extractChildren(nested.children, `${parentKey + key}-`, extractedChildren)
            } else {
              extractedChildren.push(
                createVNode(
                  'div',
                  {
                    style: itemStyle.value,
                    class: itemClass,
                    key: `nested-${parentKey + key}`
                  },
                  {
                    default: () => [nested]
                  },
                  PatchFlags.PROPS | PatchFlags.STYLE,
                  ['style', 'class']
                )
              )
            }
          })
        }
        // if the current child is valid vnode, then append this current vnode
        // to item as child node.
      } else if (isValidElementNode(child)) {
        extractedChildren.push(
          createVNode(
            'div',
            {
              style: itemStyle.value,
              class: itemClass,
              key: `LoopKey${parentKey + loopKey}`
            },
            {
              default: () => [child]
            },
            PatchFlags.PROPS | PatchFlags.STYLE,
            ['style', 'class']
          )
        )
      }
    })

    return extractedChildren
  }

  watchEffect(() => {
    const { size = 'small', wrap, direction: dir, fill } = props

    // when the specified size have been given
    if (isArray(size)) {
      const [h = 0, v = 0] = size
      horizontalSize.value = h
      verticalSize.value = v
    } else {
      let val: number
      if (isNumber(size)) {
        val = size as number
      } else {
        val = SIZE_MAP[size || 'small'] || SIZE_MAP.small
      }

      if ((wrap || fill) && dir === 'horizontal') {
        horizontalSize.value = verticalSize.value = val
      } else {
        if (dir === 'horizontal') {
          horizontalSize.value = val
          verticalSize.value = 0
        } else {
          verticalSize.value = val
          horizontalSize.value = 0
        }
      }
    }
  })

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const render = (): string | VNode | VNodeNormalizedChildren | null => {
    const { spacer, direction } = props

    const children = renderSlot(slots, 'default', { key: 0 }, () => [])

    if ((children.children ?? []).length === 0) return null
    // loop the children, if current children is rendered via `renderList` or `<v-for>`
    if (isArray(children.children)) {
      let extractedChildren = extractChildren(children.children)

      if (spacer) {
        // track the current rendering index, when encounters the last element
        // then no need to add a spacer after it.
        const len = extractedChildren.length - 1
        extractedChildren = extractedChildren.reduce<VNode[]>((acc, child, idx) => {
          const children = [...acc, child]
          if (idx !== len) {
            children.push(
              createVNode(
                'span',
                // adding width 100% for vertical alignment,
                // when the spacer inherit the width from the
                // parent, this span's width was not set, so space
                // might disappear
                {
                  style: [
                    itemStyle.value,
                    direction === 'vertical' ? 'width: 100%' : null
                  ],
                  key: idx
                },
                [
                  // if spacer is already a valid vnode, then append it to the current
                  // span element.
                  // otherwise, treat it as string.
                  isVNode(spacer)
                    ? spacer
                    : createTextVNode(spacer as string, PatchFlags.TEXT)
                ],
                PatchFlags.STYLE
              )
            )
          }
          return children
        }, [])
      }

      // spacer container.
      return createVNode(
        'div',
        {
          class: classes.value,
          style: containerStyle.value
        },
        extractedChildren,
        PatchFlags.STYLE | PatchFlags.CLASS
      )
    }

    return children.children
  }
</script>

<template>
  <render />
</template>
