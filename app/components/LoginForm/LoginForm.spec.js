import React from 'react'
import Input from 'common/Input/Input'
import {shallow} from 'enzyme'
import LoginForm from './LoginForm'
import AuthButton from 'common/AuthButton/AuthButton'
import {Link} from 'react-router-dom'
import sinon from 'sinon'

describe('<LoginForm />', () => {
  let wrapper, onSubmit

  before(() => {
    onSubmit = sinon.spy()
    wrapper = shallow(
      <LoginForm
        onSubmit={onSubmit}
      />
    )
  })

  it('should render email input', () => {
    expect(wrapper.find({type: 'email', name: 'email'}).type()).to.equal(Input)
  })

  it('should render password input', () => {
    expect(wrapper.find({type: 'password', name: 'password'}).type()).to.equal(Input)
  })

  it('should render auth button', () => {
    expect(wrapper.find(AuthButton)).to.have.length(1)
  })

  it('should render link to password recovering', () => {
    expect(wrapper.find(Link).prop('to')).to.equal('/enter/recover')
  })

  it('should update email prop in state', () => {
    const value = 'test'
    const event = {
      target: {
        getAttribute: () => 'email',
        value,
      },
      preventDefault: () => {}
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
      },
      preventDefault: () => {}
    }
    wrapper.find({type: 'password', name: 'password'}).simulate('change', event)
    expect(wrapper.state('password')).to.equal(value)
  })

  it('should validate email', () => {
    const invalidEmail = 'email#invalid.com'
    const preventDefault = sinon.spy()
    const event = {
      target: {
        getAttribute: () => 'email',
        value: invalidEmail
      },
      preventDefault
    }
    wrapper.find(Input).at(0).simulate('change', event)
    wrapper.find(AuthButton).simulate('click', {preventDefault})
    const validation = wrapper.state('validation')
    expect(validation.email).to.equal('Invalid email pattern. Example: mymail@gmail.com.')
  })

  it('should reset validation text on change', () => {
    const event = {
      target: {
        getAttribute: () => 'email',
        value: 'em'
      },
      preventDefault: () => {}
    }
    wrapper.setState({validation: {email: 'Invalid email pattern. Example: mymail@gmail.com.'}})
    wrapper.find(Input).at(0).simulate('change', event)
    expect(wrapper.state('validation').email).to.equal('')
  })

  it('should not call onSubmit callback if email pattern is invalid', () => {
    const preventDefault = sinon.spy()
    wrapper.setState({email: 'testmailcom'})
    wrapper.find(AuthButton).simulate('click', {preventDefault})
    expect(onSubmit.calledOnce).to.be.false
  })

  it('should call onSubmit callback when auth button is clicked', () => {
    const preventDefault = sinon.spy()
    wrapper.setState({email: 'test@mail.com'})
    wrapper.find(AuthButton).simulate('click', {preventDefault})
    expect(onSubmit.calledWith(wrapper.state())).to.be.true
  })
})
