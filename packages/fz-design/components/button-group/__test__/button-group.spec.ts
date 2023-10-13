import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import ButtonGroup from '../index'

describe('ButtonGroup', () => {
  test('class', () => {
    const wrapper = mount(ButtonGroup)
    expect(wrapper.classes()).toContain('fz-button-group')
  })
})
