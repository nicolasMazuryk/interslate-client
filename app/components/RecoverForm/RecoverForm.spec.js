import React from 'react'
import {mount} from 'enzyme'
import RecoverForm from './RecoverForm'
import AuthButton from 'common/AuthButton/AuthButton'
import sinon from 'sinon'

describe('<RecoverForm />', () => {
  let wrapper, onSubmit

  before(() => {
    onSubmit = sinon.spy()
    wrapper = mount(
      <RecoverForm
        onSubmit={onSubmit}
      />
    )
  })

  it('should render email input', () => {
    expect(wrapper.find({type: 'email', name: 'email'}).type()).to.equal('input')
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

  it('should validate email', () => {
    const invalidEmail = 'email#invalid.com'
    const event = {
      target: {
        getAttribute: () => 'email',
        value: invalidEmail
      }
    }
    wrapper.find({type: 'email', name: 'email'}).simulate('change', event)
    wrapper.find('button').simulate('click')
    const validation = wrapper.state('validation')
    expect(validation.email).to.equal('Invalid email pattern. Example: mymail@gmail.com.')
  })

  it('should reset validation text on change', () => {
    const event = {
      target: {
        getAttribute: () => 'email',
        value: 'em'
      }
    }
    wrapper.setState({validation: {email: 'Invalid email pattern. Example: mymail@gmail.com.'}})
    wrapper.find({type: 'email', name: 'email'}).simulate('change', event)
    expect(wrapper.state('validation').email).to.equal('')
  })

  it('should not call onSubmit callback if email pattern is invalid', () => {
    wrapper.setState({email: 'testmailcom'})
    wrapper.find('button').simulate('click')
    expect(onSubmit.calledOnce).to.be.false
  })

  it('should call onSubmit callback when auth button is clicked', () => {
    wrapper.setState({email: 'test@mail.com'})
    wrapper.find('button').simulate('click')
    expect(onSubmit.calledWith(wrapper.state())).to.be.true
  })
})
