import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Barrage from '../index'

describe('Barrage', () => {
  test('class', () => {
    const wrapper = mount(Barrage)
    expect(wrapper.classes()).toContain('fz-barrage')
  })
})
