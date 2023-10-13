import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import StickyCard from '../index'

describe('StickPanel', () => {
  test('class', () => {
    const wrapper = mount(StickyCard)
    expect(wrapper.classes()).toContain('fz-sticky-card')
  })

  test('borderColor', () => {
    const wrapper = mount(StickyCard, {
      props: { borderColor: 'red' }
    })
    expect(wrapper.attributes('style')).toContain('--sticky-card-border-color: red')
  })
})
