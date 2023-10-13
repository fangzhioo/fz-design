import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Loading from '../index'

describe('Loading', () => {
  test('class', () => {
    const wrapper = mount(Loading)
    expect(wrapper.classes()).toContain('fz-loading')
  })
})
