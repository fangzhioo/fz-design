import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Tag from '../index'

describe('Tag', () => {
  test('class', () => {
    const wrapper = mount(Tag, {
      props: {
        disableTransitions: true
      }
    })    
    expect(wrapper.classes()).toContain('fz-tag')
  })

  test('slot', () => {
    const wrapper = mount(Tag, {
      slots: { default: 'hello' }
    })
    expect(wrapper.text()).toBe('hello')
  })
})
