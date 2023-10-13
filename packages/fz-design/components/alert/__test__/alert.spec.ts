import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Alert from '../index'

describe('Alert', () => {
  test('class', () => {
    const wrapper = mount(Alert)
    expect(wrapper.classes()).toContain('fz-alert')
  })
})
