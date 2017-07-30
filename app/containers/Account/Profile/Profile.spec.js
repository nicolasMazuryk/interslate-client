import React from 'react'
import {mount} from 'enzyme'
import sinon from 'sinon'
import Profile from './Profile'
import EditableEmail from './EditableEmail/EditableEmail'
import DeleteAccountModal from './DeleteAccountModal/DeleteAccountModal'

describe('<Profile />', () => {
  let wrapper, deleteAccountModalOpened,
    updateUser, changeUserPassword,
    user, state, expected

  before(() => {
    deleteAccountModalOpened = false
    updateUser = sinon.spy()
    changeUserPassword = sinon.spy()
    user = {
      email: 'user@email.com'
    }
    state = {
      currentPassword: {errorMessage: '', value: ''},
      newPassword: {errorMessage: '', value: ''},
      confirmPassword: {errorMessage: '', value: ''}
    }
    wrapper = mount(
      <Profile
        user={user}
        deleteAccountModalOpened={deleteAccountModalOpened}
        updateUser={updateUser}
        changeUserPassword={changeUserPassword}
      />
    )
  })

  it('should render <EditableEmail />', () => {
    expect(wrapper.find(EditableEmail)).to.have.length(1)
  })

  it('should have proper email value', () => {
    expect(wrapper.find(EditableEmail).prop('value')).to.equal(user.email)
  })

  it('should show `currentPassword` error', () => {
    wrapper.find({name: 'changePassword'}).simulate('click')
    expect(wrapper.state().currentPassword).to.be.deep.equal({
      errorMessage: 'Enter current password'
    })
  })

  it('should not update password on empty currentPassword', () => {
    wrapper.find({name: 'changePassword'}).simulate('click')
    expect(changeUserPassword.notCalled).to.be.true
  })

  it('should show `confirmPassword` error', () => {
    state = {
      ...state,
      currentPassword: {errorMessage: '', value: 'test'}
    }
    expected = {
      ...state,
      newPassword: {errorMessage: ' '},
      confirmPassword: {errorMessage: 'Passwords doesn\'t match'}
    }
    wrapper.setState(state)
    wrapper.find({name: 'changePassword'}).simulate('click')
    expect(wrapper.state()).to.deep.equal(expected)
  })

  it('should not update password on empty newPassword', () => {
    wrapper.find({name: 'changePassword'}).simulate('click')
    expect(changeUserPassword.notCalled).to.be.true
  })

  it('should show error if `confirmPassword` not match', () => {
    state = {
      ...state,
      newPassword: {errorMessage: '', value: 'test'},
      confirmPassword: {errorMessage: '', value: 'notmatch'}
    }
    expected = {
      ...state,
      newPassword: {errorMessage: ' '},
      confirmPassword: {errorMessage: 'Passwords doesn\'t match'}
    }
    wrapper.setState(state)
    wrapper.find({name: 'changePassword'}).simulate('click')
    expect(wrapper.state()).to.deep.equal(expected)
  })

  it('should update user password', () => {
    state = {
      ...state,
      newPassword: {errorMessage: '', value: 'test'},
      confirmPassword: {errorMessage: '', value: 'test'}
    }
    wrapper.setState(state)
    wrapper.find({name: 'changePassword'}).simulate('click')
    expect(changeUserPassword.calledOnce).to.be.true
  })

  it('should render <DeleteAccountModal /> on button click', () => {
    wrapper.setProps({deleteAccountModalOpened: true})
    expect(wrapper.find(DeleteAccountModal).prop('deleteAccountModalOpened')).to.be.true
  })
})
