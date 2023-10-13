import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Dialog from '../index'

describe('Dialog', () => {
  test('class', () => {
    const wrapper = mount(Dialog)
    expect(wrapper.classes()).toContain('fz-dialog')
  })
})
