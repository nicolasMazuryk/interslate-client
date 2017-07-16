import React from 'react'
import {mount} from 'enzyme'
import Pagination from 'common/Pagination/Pagination'
import Select from 'common/Select/Select'
import sinon from 'sinon'

describe('<Pagination />', () => {
  let wrapper,
    shownCount,
    totalCount,
    loading,
    limitCountChange,
    limitSelectOptions,
    loadItems

  before(() => {
    limitCountChange = sinon.spy()
    shownCount = 10
    totalCount = 23
    loading = false
    loadItems = sinon.spy()
    limitSelectOptions = [
      {key: 10, value: '10'},
      {key: 50, value: '50'},
      {key: 100, value: '100'},
      {key: 0, value: 'All'},
    ]
    wrapper = mount(
      <Pagination
        limitSelectOptions={limitSelectOptions}
        limitCountChange={limitCountChange}
        loading={loading}
        loadItems={loadItems}
        totalCount={totalCount}
        shownCount={shownCount}
      />
    )
  })

  it('should display current pagination counts state', () => {
    const expected = `${shownCount} showed from ${totalCount}`
    expect(wrapper.find('.pagination-count-state').text()).to.equal(expected)
  })

  it('should render select for limit change', () => {
    expect(wrapper.find(Select).prop('options')).to.equal(limitSelectOptions)
  })

  it('should change limit', () => {
    wrapper.find('select').simulate('change', {target: {value: 50}})
    expect(limitCountChange.calledOnce).to.be.true
  })

  it('should render button for loading items', () => {
    wrapper.find('button').simulate('click')
    expect(loadItems.calledOnce).to.be.true
  })

  it('should disable load button if all items are loaded', () => {
    wrapper.setProps({totalCount: 10, showCount: 10})
    expect(wrapper.find('button').prop('disabled')).to.be.true
  })
})
