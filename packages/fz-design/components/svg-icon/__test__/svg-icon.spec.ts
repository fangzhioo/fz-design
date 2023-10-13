import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import SvgIcon from '../index'

describe('SvgIcon', () => {
  test('class', () => {
    const wrapper = mount(SvgIcon)
    expect(wrapper.classes()).toContain('fz-svg-icon')
  })
})
