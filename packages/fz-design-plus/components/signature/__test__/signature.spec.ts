import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Signature from '../index'

describe('Signature', () => {
  test('class', () => {
    const wrapper = mount(Signature)
    expect(wrapper.classes()).toContain('fz-signature')
  })
})
