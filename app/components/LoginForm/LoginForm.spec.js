import React from 'react'
import {mount} from 'enzyme'
import LoginForm from './LoginForm'
import AuthButton from 'common/AuthButton/AuthButton'
import sinon from 'sinon'

describe('<LoginForm />', () => {

  let wrapper, onSubmit

  before(() => {
    onSubmit = sinon.spy()
    wrapper = mount(
      <LoginForm
        onSubmit={onSubmit}
      />
    )
  })

  it('should render email input', () => {
    expect(wrapper.find({type: 'email', name: 'email'}).type()).to.equal('input')
  })

  it('should render password input', () => {
    expect(wrapper.find({type: 'password', name: 'password'}).type()).to.equal('input')
  })

  it('should render auth button', () => {
    expect(wrapper.find(AuthButton)).to.have.length(1)
  })

  it('should update email prop in state', () => {
    const value = 'test'
    const event = {
      target: {
        getAttribute: () => 'email',
        value
      }
    }
    wrapper.find({type: 'email', name: 'email'}).simulate('change', event)
    expect(wrapper.state('email')).to.equal(value)
  })

  it('should update password prop in state', () => {
    const value = 'test'
    const event = {
      target: {
        getAttribute: () => 'password',
        value
      }
    }
    wrapper.find({type: 'password', name: 'password'}).simulate('change', event)
    expect(wrapper.state('password')).to.equal(value)
  })

  it('should call onSubmit callback when auth button is clicked', () => {
    wrapper.find('button').simulate('click')
    expect(onSubmit.calledWith(wrapper.state())).to.be.true
  })

})
