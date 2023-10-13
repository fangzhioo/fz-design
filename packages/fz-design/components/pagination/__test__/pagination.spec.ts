import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Pagination from '../index'

describe('Pagination', () => {
  test('class', () => {
    const wrapper = mount(Pagination)
    expect(wrapper.classes()).toContain('fz-pagination')
  })
})
