import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import RadioGroup from '../index'

describe('RadioGroup', () => {
  test('class', () => {
    const wrapper = mount(RadioGroup)
    expect(wrapper.classes()).toContain('fz-radio-group')
  })
})
