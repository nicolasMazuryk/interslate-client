import React from 'react'
import {mount} from 'enzyme'
import sinon from 'sinon'
import Profile from './Profile'
import EditableEmail from './EditableEmail/EditableEmail'
import DeleteAccountModal from './DeleteAccountModal/DeleteAccountModal'

describe('<Profile />', () => {
  let wrapper, deleteAccountModalOpened,
    updateUser, email

  before(() => {
    deleteAccountModalOpened = false
    updateUser = sinon.spy()
    email = 'user@email.com'
    wrapper = mount(
      <Profile
        email={email}
        deleteAccountModalOpened={deleteAccountModalOpened}
        updateUser={updateUser}
      />
    )
  })

  it('should render <EditableEmail />', () => {
    expect(wrapper.find(EditableEmail)).to.have.length(1)
  })

  it('should have proper email value', () => {
    expect(wrapper.find(EditableEmail).prop('value')).to.equal(email)
  })

  it('should render <DeleteAccountModal /> on button click', () => {
    wrapper.setProps({deleteAccountModalOpened: true})
    expect(wrapper.find(DeleteAccountModal).prop('deleteAccountModalOpened')).to.be.true
  })
})
