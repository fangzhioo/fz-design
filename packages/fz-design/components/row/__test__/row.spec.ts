import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Row from '../index'

describe('Row', () => {
  test('class', () => {
    const wrapper = mount(Row)
    expect(wrapper.classes()).toContain('fz-row')
  })
})
