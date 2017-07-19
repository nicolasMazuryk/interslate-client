import React from 'react'
import {mount} from 'enzyme'
import RegisterForm from './RegisterForm'
import AuthButton from 'common/AuthButton/AuthButton'
import sinon from 'sinon'

function getEvent(name, value) {
  return {
    target: {
      getAttribute: () => name,
      value
    }
  }
}

describe('<RegisterForm />', () => {
  let wrapper, onSubmit

  before(() => {
    onSubmit = sinon.spy()
    wrapper = mount(
      <RegisterForm
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

  it('should render confirm password input', () => {
    expect(wrapper.find({type: 'password', name: 'confirmPassword'}).type()).to.equal('input')
  })

  it('should render auth button', () => {
    expect(wrapper.find(AuthButton)).to.have.length(1)
  })

  it('should update email prop in state', () => {
    const invalidEmail = 'test'
    const event = getEvent('email', invalidEmail)
    wrapper.find({type: 'email', name: 'email'}).simulate('change', event)
    expect(wrapper.state('email')).to.equal(invalidEmail)
  })

  it('should update password prop in state', () => {
    const value = 'test'
    const event = getEvent('password', value)
    wrapper.find({type: 'password', name: 'password'}).simulate('change', event)
    expect(wrapper.state('password')).to.equal(value)
  })

  it('should update confirm password prop in state', () => {
    const value = 'test'
    const event = getEvent('confirmPassword', value)
    wrapper.find({type: 'password', name: 'confirmPassword'}).simulate('change', event)
    expect(wrapper.state('password')).to.equal(value)
  })

  it('should reset validation text on change', () => {
    wrapper.setState({validation: {email: 'Invalid email pattern. Example: mymail@gmail.com.'}})
    wrapper.find({type: 'email', name: 'email'}).simulate('change', getEvent('email', 'em'))
    expect(wrapper.state('validation').email).to.equal('')
  })

  it('should validate all the fields', () => {
    const invalidEmail = 'invalid'
    const passwordWithOneSymbol = '0'
    const otherPassword = '1232'
    wrapper.find({type: 'email', name: 'email'}).simulate('change', getEvent('email', invalidEmail))
    wrapper.find({type: 'password', name: 'password'}).simulate('change', getEvent('password', passwordWithOneSymbol))
    wrapper.find({type: 'password', name: 'confirmPassword'}).simulate('change', getEvent('confirmPassword', otherPassword))
    wrapper.find('button').simulate('click')
    const validation = wrapper.state('validation')
    const expected = {
      email: 'Invalid email pattern. Example: mymail@gmail.com.',
      password: 'Invalid password. Minimum 2 symbols.',
      confirmPassword: 'Invalid password confirmation. Passwords don\'t match.'
    }
    expect(validation).to.deep.equal(expected)
  })

  it('should not call onSubmit callback if at least one of the fields is not valid', () => {
    const validation = {
      email: 'Invalid email pattern. Example: mymail@gmail.com.',
      password: '',
      confirmPassword: ''
    }
    wrapper.setState({validation})
    wrapper.find('button').simulate('click')
    expect(onSubmit.calledOnce).to.be.false
  })

  it('should not call onSubmit if fields are not valid', () => {
    const validation = {
      email: 'Invalid email pattern. Example: mymail@gmail.com.',
      password: 'Invalid password. Minimum 2 symbols.',
      confirmPassword: 'Invalid password confirmation. Passwords don\'t match.'
    }
    wrapper.setState({validation})
    wrapper.find('button').simulate('click')
    expect(onSubmit.calledOnce).to.be.false
  })

  it('should call onSubmit callback with valid fields', () => {
    wrapper.find({type: 'email', name: 'email'}).simulate('change', getEvent('email', 'mail@mail.com'))
    wrapper.find({type: 'password', name: 'password'}).simulate('change', getEvent('password', '12345'))
    wrapper.find({type: 'password', name: 'confirmPassword'}).simulate('change', getEvent('confirmPassword', '12345'))
    wrapper.find('button').simulate('click')
    const {email, password} = wrapper.state()
    expect(onSubmit.calledWith({email, password})).to.be.true
  })
})
