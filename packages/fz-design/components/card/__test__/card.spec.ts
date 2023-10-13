import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Card from '../index'

describe('Card', () => {
  test('class', () => {
    const wrapper = mount(Card)
    expect(wrapper.classes()).toContain('fz-card')
  })
})
