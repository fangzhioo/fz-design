import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Affix from '../index'

describe('Affix', () => {
  test('class', () => {
    const wrapper = mount(Affix)
    expect(wrapper.classes()).toContain('fz-affix')
  })
})
