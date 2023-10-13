import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Link from '../index'

describe('Link', () => {
  test('class', () => {
    const wrapper = mount(Link)
    expect(wrapper.classes()).toContain('fz-link')
  })
})
