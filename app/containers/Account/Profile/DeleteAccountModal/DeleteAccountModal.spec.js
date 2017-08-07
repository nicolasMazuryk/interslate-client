import React from 'react'
import {mount} from 'enzyme'
import sinon from 'sinon'
import Modal from 'common/Modal/Modal'
import DeleteAccountModal from './DeleteAccountModal'

describe('<DeleteAccountModal />', () => {
  let wrapper, isModalOpened,
    onCloseModal, onDeleteUser

  before(() => {
    isModalOpened = true
    onCloseModal = sinon.spy()
    onDeleteUser = sinon.spy()
    wrapper = mount(
      <DeleteAccountModal
        deleteAccountModalOpened={isModalOpened}
        closeDeleteAccountModal={onCloseModal}
        deleteUser={onDeleteUser}
      />
    )
  })

  it('should render the modal', () => {
    expect(wrapper.find(Modal).props().opened).to.be.true
  })

  it('should delete user', () => {
    wrapper.find({type: 'submit', name: 'save'}).simulate('click')
    expect(onDeleteUser.calledOnce).to.be.true
  })

  it('should close the modal', () => {
    wrapper.find({name: 'close'}).simulate('click')
    expect(onCloseModal.calledOnce).to.be.true
  })
})
