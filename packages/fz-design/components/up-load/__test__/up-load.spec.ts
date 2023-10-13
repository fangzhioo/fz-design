import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import UpLoad from '../index'

describe('UpLoad', () => {
  test('class', () => {
    const wrapper = mount(UpLoad)
    expect(wrapper.classes()).toContain('fz-up-load')
  })
})
