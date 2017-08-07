import React from 'react'
import {mount} from 'enzyme'
import Select from './Select'
import sinon from 'sinon'

describe('<Select />', () => {
  let wrapper, options, divider,
    onChange, recentOptions

  before(() => {
    recentOptions = [
      {key: 'recent', value: 'recent'},
      {key: 'recent2', value: 'recent2'},
    ]
    options = [
      {key: 'key', value: 'value'},
      {key: 'key1', value: 'value1'}
    ]
    onChange = sinon.spy()
    divider = '======='
    wrapper = mount(
      <Select
        recentOptions={recentOptions}
        divider={divider}
        options={options}
        onChange={onChange}
      />
    )
  })

  it('should render recent options at first', () => {
    const actual = [
      wrapper.find('option').at(0).text(),
      wrapper.find('option').at(1).text()
    ]
    const expected = [
      'recent',
      'recent2'
    ]

    expect(actual).to.deep.equal(expected)
  })

  it('should render divider after recent options', () => {
    const actual = wrapper.find('option').at(recentOptions.length).text()

    expect(actual).to.deep.equal(divider)
  })

  it('should render regular options after divider', () => {
    const actual = [
      wrapper.find('option').at(3).text(),
      wrapper.find('option').at(4).text()
    ]
    const expected = [
      'value',
      'value1'
    ]

    expect(actual).to.deep.equal(expected)
  })

  it('should not render recent options', () => {
    wrapper.setProps({recentOptions: []})
    expect(wrapper.find('option')).to.have.length(options.length)
  })

  it('should not render divider', () => {
    wrapper.setProps({recentOptions: []})
    expect(wrapper.find('option.divider')).to.have.length(0)
  })

  it('should show select loader', () => {
    wrapper.setProps({options: []})
    expect(wrapper.find('span.select').prop('className')).to.equal('select is-loading')
  })

  it('should not show select loader', () => {
    wrapper.setProps({options})
    expect(wrapper.find('span.select').prop('className')).to.equal('select')
  })
})
