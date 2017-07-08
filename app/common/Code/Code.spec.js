import React from 'react'
import {mount} from 'enzyme'
import Code from './Code'

describe('<Code />', () => {
  let wrapper, data, withHTML

  before(() => {
    withHTML = false
    data = 'x = a * b'
    wrapper = mount(
      <Code
        data={data}
        withHTML={withHTML}
      />
    )
  })

  it('should render string as string', () => {
    expect(wrapper.find('code').text()).to.equal(data)
  })

  it('should render object as stringified json', () => {
    const data = {
      key: 'value'
    }
    const expected = JSON.stringify(data, null, 2)
    wrapper.setProps({data})
    expect(wrapper.find('code').text()).to.equal(expected)
  })

  it('should render array as string with brackets', () => {
    const data = [1, 2, 3]
    const expected = '[\n  1,\n  2,\n  3\n]'
    wrapper.setProps({data})
    expect(wrapper.find('code').text()).to.equal(expected)
  })

  it('should not render object with HTML string values', () => {
    const data = {
      key: 'value',
      html: '<script>XSS</script>'
    }
    wrapper.setProps({data})
    expect(wrapper.find('code').text()).to.equal('')
  })

  it('should not render array with HTML string value', () => {
    const data = ['value', '<script>XSS</script>']
    wrapper.setProps({data})
    expect(wrapper.find('code').text()).to.equal('')
  })

  it('should not render string with HTML tags', () => {
    const data = '<script>XSS</script>'
    wrapper.setProps({data})
    expect(wrapper.find('code').text()).to.equal('')
  })

  it('should render HTML', () => {
    const data = '<div>HTML</div>'
    const withHTML = true
    wrapper.setProps({data, withHTML})
    const expected = '<div>HTML</div>'
    expect(wrapper.find('code').text()).to.equal(expected)
  })
})
