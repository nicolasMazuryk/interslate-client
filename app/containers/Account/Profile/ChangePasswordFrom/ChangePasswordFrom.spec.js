import React from 'react'
import {mount} from 'enzyme'
import sinon from 'sinon'
import ChangePasswordForm from './ChangePasswordForm'

describe('<ChangePasswordFrom />', () => {
  let wrapper, changeUserPassword, state, expected

  before(() => {
    changeUserPassword = sinon.spy()
    state = {
      currentPassword: {errorMessage: '', value: ''},
      newPassword: {errorMessage: '', value: ''},
      confirmPassword: {errorMessage: '', value: ''}
    }
    wrapper = mount(
      <ChangePasswordForm
        changeUserPassword={changeUserPassword}
      />
    )
  })

  it('should show `currentPassword` error', () => {
    wrapper.find({name: 'changePassword'}).simulate('click')
    expect(wrapper.state('currentPassword').errorMessage).to.be.equal('Enter current password')
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
    wrapper.setState(state)
    wrapper.find({name: 'changePassword'}).simulate('click')
    expect(wrapper.state('confirmPassword').errorMessage).to.be.equal('Passwords don\'t match')
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
      newPassword: {errorMessage: ' ', value: 'test'},
      confirmPassword: {errorMessage: 'Passwords don\'t match', value: 'notmatch'}
    }
    wrapper.setState(state)
    wrapper.find({name: 'changePassword'}).simulate('click')
    expect(wrapper.state()).to.deep.equal(expected)
  })

  it('should update user password if passwords match', () => {
    state.newPassword.value = 'test'
    state.confirmPassword.value = 'test'
    wrapper.setState(state)
    wrapper.find({name: 'changePassword'}).simulate('click')
    expect(changeUserPassword.calledWith({
      currentPassword: 'test',
      newPassword: 'test'
    })).to.be.true
  })
})
