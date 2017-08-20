import React from 'react'
import {mount} from 'enzyme'
import GroupsMultiSelect from './GroupsMultiSelectItem'
import sinon from 'sinon'

describe('<GroupsMultiSelectItem />', () => {
  let wrapper, item,
    onItemClick, isSelected

  before(() => {
    item = 'test'
    onItemClick = sinon.spy()
    isSelected = false
    wrapper = mount(
      <GroupsMultiSelect
        item={item}
        onItemClick={onItemClick}
        isSelected={isSelected}
      />
    )
  })

  it('should render input with checked checkbox', () => {
    wrapper.setProps({isSelected: true})
    expect(wrapper.find('input[type="checkbox"]').prop('checked')).to.equal(true)
  })

  it('should have proper label', () => {
    expect(wrapper.find('label').text()).to.equal('test')
  })

  it('should call on item click', () => {
    wrapper.find('.dropdown-item').simulate('click')
    expect(onItemClick.args[0][1]).to.equal(item)
  })
})
