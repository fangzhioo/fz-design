import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Button from '../index'

describe('Button', () => {
  test('default slot', () => {
    const wrapper = mount(Button, {
      slots: { default: '这是按钮' }
    })
    expect(wrapper.text()).toContain('这是按钮')
  })
})
