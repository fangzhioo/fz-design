import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import <%= displayName %> from '../index'

describe('<%= displayName %>', () => {
  test('class', () => {
    const wrapper = mount(<%= displayName %>)
    expect(wrapper.classes()).toContain('fz-<%= name %>')
  })
})
