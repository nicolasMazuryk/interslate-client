import React from 'react'
import {mount} from 'enzyme'
import {Auth} from './Auth'
import sinon from 'sinon'
import LoginForm from 'components/LoginForm/LoginForm'
import RegisterForm from 'components/RegisterForm/RegisterForm'

describe('<Auth />', () => {
  let wrapper, login, register,
    user, newUser, history, push

  before(() => {
    push = sinon.spy()
    user = {
      email: 'test'
    }
    newUser = {
      email: 'test1'
    }
    login = sinon.spy()
    register = sinon.spy()
    history = {push}
    wrapper = mount(
      <Auth
        login={login}
        register={register}
        history={history}
      />
    )
  })

  it('should render login from', () => {
    expect(wrapper.find(LoginForm)).to.have.length(1)
  })

  it('should render register from', () => {
    wrapper.setState({formType: 'register'})
    expect(wrapper.find(RegisterForm)).to.have.length(1)
  })

  it('should redirect to "/" if user is passed', () => {
    wrapper = mount(
      <Auth
        login={login}
        register={register}
        history={history}
      />
    )
    wrapper.setProps({user})
    expect(push.calledWith('/')).to.be.true
  })

  it('should login newUser', () => {
    wrapper = mount(
      <Auth
        login={login}
        register={register}
        history={history}
      />
    )
    wrapper.setProps({newUser})
    expect(login.calledWith(newUser)).to.be.true
  })
})
