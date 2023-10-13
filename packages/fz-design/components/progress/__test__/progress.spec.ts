import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Progress from '../index'

describe('Progress', () => {
  test('class', () => {
    const wrapper = mount(Progress)
    expect(wrapper.classes()).toContain('fz-progress')
  })
})
