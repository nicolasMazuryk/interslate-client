import React from 'react'
import {mount} from 'enzyme'
import GroupsMultiSelect from './GroupsMultiSelect'
import sinon from 'sinon'

describe('<GroupsMultiSelect />', () => {
  let wrapper, groups,
    selectedGroups, onSelect,
    onDeselect

  before(() => {
    groups = []
    selectedGroups = ['test1']
    onSelect = sinon.spy()
    onDeselect = sinon.spy()
    wrapper = mount(
      <GroupsMultiSelect
        groups={groups}
        selectedGroups={selectedGroups}
        onSelect={onSelect}
        onDeselect={onDeselect}
      />
    )
  })

  it('should render button with \'Select groups \' title', () => {
    wrapper.setProps({selectedGroups: []})
    expect(wrapper.find('button span').text()).to.equal('Select groups')
  })

  it('should render button with first to groups title', () => {
    wrapper.setProps({selectedGroups: ['test1', 'test2']})
    expect(wrapper.find('button span').text()).to.equal('test1, test2')
  })

  it('should render button with 15 char limit and \'...\' title', () => {
    wrapper.setProps({selectedGroups: ['test1', 'test2', 'test3']})
    expect(wrapper.find('button span').text()).to.equal('test1, test2, t ...')
  })

  it('should open dropdown menu when button is clicked', () => {
    wrapper.setState({isOpened: false})
    wrapper.find('button').simulate('click')
    expect(wrapper.state('isOpened')).to.be.true
  })

  it('should render group items', () => {
    wrapper.setProps({groups: ['test1', 'test2', 'test3']})
    expect(wrapper.find('a.groups-multi-select-item')).to.have.length(3)
  })
})
