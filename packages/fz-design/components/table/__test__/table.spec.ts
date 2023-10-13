import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Table from '../index'

describe('Table', () => {
  test('class', () => {
    const wrapper = mount(Table)
    expect(wrapper.classes()).toContain('fz-table')
  })
})
