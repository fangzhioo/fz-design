import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import InfiniteScrolling from '../index'

describe('InfiniteScrolling', () => {
  test('class', () => {
    const wrapper = mount(InfiniteScrolling)
    expect(wrapper.classes()).toContain('fz-infinite-scrolling')
  })
})
