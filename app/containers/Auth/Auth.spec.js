import React from 'react'
import {mount} from 'enzyme'
import {Auth} from './Auth'
import sinon from 'sinon'
import LoginForm from 'components/LoginForm/LoginForm'
import RegisterForm from 'components/RegisterForm/RegisterForm'
import Loader from 'common/Loader/Loader'

describe('<Auth />', () => {
  let wrapper, login, register,
    user, newUser, history, push,
    loading

  before(() => {
    push = sinon.spy()
    loading = false
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
        loading={loading}
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

  it('should redirect to "/translations" if user is passed', () => {
    wrapper = mount(
      <Auth
        login={login}
        register={register}
        history={history}
        loading={loading}
      />
    )
    wrapper.setProps({user})
    expect(push.calledWith('/translations')).to.be.true
  })

  it('should login newUser', () => {
    wrapper = mount(
      <Auth
        login={login}
        register={register}
        history={history}
        loading={loading}
      />
    )
    wrapper.setProps({newUser})
    expect(login.calledWith(newUser)).to.be.true
  })

  it('should show loader', () => {
    wrapper.setProps({loading: true})
    expect(wrapper.find(Loader)).to.have.length(1)
  })

  it('should not show auth form', () => {
    wrapper.setProps({loading: true})
    expect(wrapper.find('.auth-form')).to.have.length(0)
  })
})
