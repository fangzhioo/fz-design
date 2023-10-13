import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Radio from '../index'

describe('Radio', () => {
  test('class', () => {
    const wrapper = mount(Radio)
    expect(wrapper.classes()).toContain('fz-radio')
  })
})
