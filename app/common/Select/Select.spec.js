import React from 'react'
import {mount} from 'enzyme'
import Select from './Select'
import sinon from 'sinon'

describe('<Select />', () => {

  let wrapper, options, onChange

  before(() => {
    options = [
      {key: 'key', value: 'value'},
      {key: 'key1', value: 'value1'}
    ]
    onChange = sinon.spy()
    wrapper = mount(
      <Select
        options={options}
        onChange={onChange}
      />
    )
  })

  it('should render options', () => {
    expect(wrapper.find('option')).to.have.length(options.length)
  })

  it('should render option with correct value prop', () => {
    const firstOption = wrapper.find('select > option').first()
    expect(firstOption.prop('value')).to.equal(options[0].key)
  })

  it('should render option with correct text', () => {
    const firstOption = wrapper.find('select > option').first()
    expect(firstOption.text()).to.equal(options[0].value)
  })
})