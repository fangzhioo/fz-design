import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Avatar from '../index'

describe('Avatar', () => {
  test('class', () => {
    const wrapper = mount(Avatar)
    expect(wrapper.classes()).toContain('fz-avatar')
  })
})
