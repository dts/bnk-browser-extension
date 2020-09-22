import { mount } from '@vue/test-utils'
import Loader from '@/popup/components/Loader'

test('displays error message', () => {
  // mount() returns a wrapped Vue component we can interact with
  const wrapper = mount(Loader, {
    propsData: { error: 'error-string', value: null }
  });

  // Assert the rendered text of the component
  expect(wrapper.text()).toContain('error-string')
})

test('displays value message', () => {
  // mount() returns a wrapped Vue component we can interact with
  const wrapper = mount(Loader, {
    propsData: { error: null, value: { foo: 'bar' } }
  });

  // Assert the rendered text of the component
  expect(wrapper.text()).toContain('empty default slot')
})

test('displays spinner if no value or error', () => {
  // mount() returns a wrapped Vue component we can interact with
  const wrapper = mount(Loader, {
    propsData: { error: null, value: null}
  });

  // Assert the rendered text of the component
  expect(wrapper.html()).toContain('svg')
})
