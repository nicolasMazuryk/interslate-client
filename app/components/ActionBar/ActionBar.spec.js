import React from 'react'
import {mount} from 'enzyme'
import ActionBar from './ActionBar'
import Select from 'common/Select/Select'
import sinon from 'sinon'

describe('<ActionBar />', () => {
  let
    wrapper, languages, groups,
    openAddTranslationModal,
    selectedGroups

  before(() => {
    groups = []
    selectedGroups = []
    languages = [
      {key: 'ru', value: 'Russian'},
      {key: 'en', value: 'English'},
    ]
    openAddTranslationModal = sinon.spy()
    wrapper = mount(
      <ActionBar
        groups={groups}
        selectedGroups={selectedGroups}
        languages={languages}
        openAddTranslationModal={openAddTranslationModal}
      />
    )
  })

  it('should render language select', () => {
    expect(wrapper.find(Select).prop('name')).to.equal('languages')
  })

  it('should render language select with provided languages', () => {
    expect(wrapper.find('select[name="languages"] option').first().text()).to.equal(languages[0].value)
  })

  it('should render add key button', () => {
    expect(wrapper.find('button[name="add-key"]').length).to.equal(1)
  })

  it('should render upload translations link', () => {
    expect(wrapper.find('a[name="upload"]').length).to.equal(1)
  })

  it('should open add translation modal when button add is clicked', () => {
    wrapper.find('button[name="add-key"]').simulate('click')
    expect(openAddTranslationModal.calledOnce).to.be.true
  })
})
