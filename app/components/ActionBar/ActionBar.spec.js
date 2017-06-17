import React from 'react'
import {shallow} from 'enzyme'
import ActionBar from './ActionBar'
import Select from 'common/Select/Select'
import sinon from 'sinon'

describe('<ActionBar />', () => {

  let
    wrapper, languages,
    openAddTranslationModal

  before(() => {
    languages = [
      {key: 'ru', value: 'Russian'},
      {key: 'en', value: 'English'},
    ]
    openAddTranslationModal = sinon.spy()
    wrapper = shallow(
      <ActionBar
        languages={languages}
        openAddTranslationModal={openAddTranslationModal}
      />
    )
  })

  it('should render language select', () => {
    expect(wrapper.find(Select).prop('name')).to.equal('languages')
  })

  it('should render add key button', () => {
    expect(wrapper.find('button[name="add-key"]').length).to.equal(1)
  })

  it('should render upload button', () => {
    expect(wrapper.find('button[name="upload"]').length).to.equal(1)
  })

  it('should open add translation modal when button add is clicked', () => {
    wrapper.find('button[name="add-key"]').simulate('click')
    expect(openAddTranslationModal.calledOnce).to.be.true
  })

})