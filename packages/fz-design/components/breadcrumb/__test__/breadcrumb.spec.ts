import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Breadcrumb from '../index'

describe('Breadcrumb', () => {
  test('class', () => {
    const wrapper = mount(Breadcrumb)
    expect(wrapper.classes()).toContain('fz-breadcrumb')
  })
})
