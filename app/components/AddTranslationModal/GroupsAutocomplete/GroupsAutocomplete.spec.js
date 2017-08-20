import React from 'react'
import {mount} from 'enzyme'
import sinon from 'sinon'
import GroupsAutocomplete from './GroupsAutocomplete'
import Autocomplete from 'react-autocomplete'

describe('<GroupsAutocomplete />', () => {
  let wrapper,
    group,
    groups,
    changeGroup,
    selectGroup


  before(() => {
    group = ''
    groups = ['test']
    changeGroup = sinon.spy()
    selectGroup = sinon.spy()
    wrapper = mount(
      <GroupsAutocomplete
        groups={groups}
        group={group}
        changeGroup={changeGroup}
        selectGroup={selectGroup}
      />
    )
  })

  it('should render Autocomplete', () => {
    expect(wrapper.find(Autocomplete)).to.have.length(1)
  })

  it('should have label with \'Group\' text', () => {
    expect(wrapper.find('label').text()).to.equal('Group (optional)')
  })

  it('should contain help text without groups text', () => {
    wrapper.setProps({groups: ['test']})
    expect(wrapper.find('.help').text()).to.equal('Type a new group or select from existing')
  })

  it('should contain help text with groups text', () => {
    wrapper.setProps({groups: []})
    expect(wrapper.find('.help').text()).to.equal('Type a new group ')
  })
})
