import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import ConfirmBox from '../index'

describe('ConfirmBox', () => {
  test('class', () => {
    const wrapper = mount(ConfirmBox)
    expect(wrapper.classes()).toContain('fz-confirm-box')
  })
})
