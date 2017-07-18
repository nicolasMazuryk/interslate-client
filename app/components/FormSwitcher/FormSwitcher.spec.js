import React from 'react'
import {mount} from 'enzyme'
import FormSwitcher from 'components/FormSwitcher/FormSwitcher'
import sinon from 'sinon'

describe('<FormSwitcher />', () => {
  let wrapper, type, changeType

  before(() => {
    changeType = sinon.spy()
    type = 'login'
    wrapper = mount(
      <FormSwitcher type={type} changeType={changeType} />
    )
  })

  it('should render text "Don\'t have an account"', () => {
    expect(wrapper.find('.level-item span').text()).to.equal('Don\'t have an account?')
  })

  it('should link with "Register" text', () => {
    expect(wrapper.find('.level-item a.is-link').text()).to.equal('Register')
  })

  it('should render text "I have an account."', () => {
    wrapper.setProps({type: 'register'})
    expect(wrapper.find('.level-item span').text()).to.equal('I have an account.')
  })

  it('should link with "Login" text', () => {
    expect(wrapper.find('.level-item a.is-link').text()).to.equal('Login')
  })

  it('should call change on login form', () => {
    wrapper.find('a.is-link').simulate('click')
    expect(changeType.calledWith('login')).to.be.true
  })

  it('should call change on register form', () => {
    wrapper.setProps({type: 'login'})
    wrapper.find('a.is-link').simulate('click')
    expect(changeType.calledWith('register')).to.be.true
  })
})
