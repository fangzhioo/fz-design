import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Calendar from '../index'

describe('Calendar', () => {
  test('class', () => {
    const wrapper = mount(Calendar)
    expect(wrapper.classes()).toContain('fz-calendar')
  })
})
