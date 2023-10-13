import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Image from '../index'

describe('Image', () => {
  test('class', () => {
    const wrapper = mount(Image)
    expect(wrapper.classes()).toContain('fz-image')
  })
})
