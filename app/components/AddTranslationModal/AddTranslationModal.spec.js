import React from 'react'
import {shallow} from 'enzyme'
import AddTranslationModal from './AddTranslationModal'
import Input from 'common/Input/Input'
import Modal from 'common/Modal/Modal'
import sinon from 'sinon'

describe('<AddTranslationModal />', () => {

  let
    wrapper, onSubmit,
    onClose, opened

  before(() => {
    opened = true
    onSubmit = sinon.spy()
    onClose = sinon.spy()
    wrapper = shallow(
      <AddTranslationModal
        opened={opened}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    )
  })

  it('should render modal', () => {
    expect(wrapper.find(Modal)).to.have.length(1)
  })

  it('should render inputs', () => {
    expect(wrapper.find(Input)).to.have.length(2)
  })

})