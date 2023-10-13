import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Form from '../index'

describe('Form', () => {
  test('class', () => {
    const wrapper = mount(Form)
    expect(wrapper.classes()).toContain('fz-form')
  })
})
