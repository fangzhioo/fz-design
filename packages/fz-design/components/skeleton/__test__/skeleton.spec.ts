import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Skeleton from '../index'

describe('Skeleton', () => {
  test('class', () => {
    const wrapper = mount(Skeleton)
    expect(wrapper.classes()).toContain('fz-skeleton')
  })
})
