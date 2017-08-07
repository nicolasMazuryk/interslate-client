import React from 'react'
import {shallow} from 'enzyme'
import {
  Auth,
  componentWillMount,
  componentWillReceiveProps
} from './Auth'
import sinon from 'sinon'
import Loader from 'common/Loader/Loader'
import FormDivider from 'containers/Auth/FormDivider/FormDivider'
import FormSwitcher from 'containers/Auth/FormSwitcher/FormSwitcher'
import LoginWithServices from 'containers/Auth/LoginWithServices/LoginWithServices'
import {Route} from 'react-router-dom'

describe('<Auth />', () => {
  let wrapper, login, register,
    user, newUser, history, push,
    loading, recover, location

  before(() => {
    push = sinon.spy()
    loading = false
    location = {
      pathname: '/enter/login'
    }
    user = {
      email: 'test'
    }
    newUser = {
      email: 'test1'
    }
    login = sinon.spy()
    register = sinon.spy()
    recover = sinon.spy()
    history = {push}
    wrapper = shallow(
      <Auth
        login={login}
        recover={recover}
        register={register}
        user={null}
        newUser={newUser}
        history={history}
        location={location}
        loading={loading}
      />
    )
  })


  it('should render login route', () => {
    expect(wrapper.find(Route).at(0).prop('path')).to.equal('/enter/login')
  })

  it('should render register from', () => {
    expect(wrapper.find(Route).at(1).prop('path')).to.equal('/enter/register')
  })

  it('should render recover from', () => {
    expect(wrapper.find(Route).at(2).prop('path')).to.equal('/enter/recover')
  })

  it('should redirect to login form', () => {
    const user = null
    const ctx = {
      user,
      history,
      newUser,
      location: {pathname: '/enter'},
      login
    }

    componentWillReceiveProps.call(null, ctx)

    expect(history.push.calledWith('/enter/login')).to.be.true
  })

  it('should login new user if it is passed', () => {
    const user = null
    const pathname = '/enter/login'
    const ctx = {
      user,
      history,
      newUser,
      location: {pathname},
      login
    }

    componentWillReceiveProps.call(null, ctx)

    expect(login.calledWith(newUser)).to.be.true
  })

  it('should redirect to translations', () => {
    const newUser = null
    const pathname = '/enter/login'
    const ctx = {
      user,
      history,
      newUser,
      location: {pathname},
      login
    }

    componentWillReceiveProps.call(null, ctx)

    expect(history.push.calledWith('/translations')).to.be.true
  })

  it('should redirect to login view', () => {
    const newUser = null
    const pathname = '/enter'
    const ctx = {
      user,
      history,
      newUser,
      location: {pathname},
      login
    }

    componentWillReceiveProps.call(null, ctx)

    expect(history.push.calledWith('/enter/login')).to.be.true
  })

  it('should redirect from /enter', () => {
    const pathname = '/enter'
    const ctx = {
      props: {
        location: {pathname},
        history
      }
    }

    componentWillMount.call(ctx)

    expect(history.push.calledWith('/enter/login')).to.be.true
  })

  it('should show loader', () => {
    wrapper.setProps({loading: true})
    expect(wrapper.find(Loader).prop('style').display).to.equal('block')
  })

  it('should not show auth form', () => {
    wrapper.setProps({loading: true})
    expect(wrapper.find('.auth-form').prop('style').display).to.equal('none')
  })

  it('should change title text to "Login"', () => {
    wrapper.setProps({location: {pathname: '/enter/login', loading: false}})
    expect(wrapper.find('h1.title').text()).to.equal('Login')
  })

  it('should change title text to "Register"', () => {
    wrapper.setProps({location: {pathname: '/enter/register'}})
    expect(wrapper.find('h1.title').text()).to.equal('Register')
  })

  it('should change title text to "Recover"', () => {
    wrapper.setProps({location: {pathname: '/enter/recover'}})
    expect(wrapper.find('h1.title').text()).to.equal('Recover')
  })

  it('should render recover help text', () => {
    wrapper.setProps({location: {pathname: '/enter/recover'}})
    expect(wrapper.find('p.content').text()).to.equal('Type your email and we will send you new password.')
  })

  it('should render form divider', () => {
    wrapper.setProps({location: {pathname: '/enter/login'}})
    expect(wrapper.find(FormDivider)).to.have.length(1)
  })

  it('should render login with google service', () => {
    wrapper.setProps({location: {pathname: '/enter/register'}})
    expect(wrapper.find(LoginWithServices)).to.have.length(1)
  })

  it('should render form switcher', () => {
    const pathname = '/enter/register'
    wrapper.setProps({location: {pathname}})
    expect(wrapper.find(FormSwitcher).prop('pathname')).to.equal(pathname)
  })
})
