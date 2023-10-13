import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import PageHeader from '../index'

describe('PageHeader', () => {
  test('class', () => {
    const wrapper = mount(PageHeader)
    expect(wrapper.classes()).toContain('fz-page-header')
  })
})
