import React from 'react'
import {mount} from 'enzyme'
import Header from './Header'
import {Link, MemoryRouter} from 'react-router-dom'
import sinon from 'sinon'

describe('<Header />', () => {
  let
    wrapper = null,
    logout = null

  before(() => {
    logout = sinon.spy()
    wrapper = mount(
      <MemoryRouter>
        <Header isLoggedIn={true} logout={logout} />
      </MemoryRouter>
    )
  })

  it('should render logotype image', () => {
    expect(wrapper.find('img.logotype').length).to.equal(1)
  })

  it('should render link to /translations', () => {
    expect(wrapper.find(Link).first().props()).to.contain({to: '/translations'})
  })

  it('should render link to /accounts', () => {
    expect(wrapper.find(Link).last().props()).to.contain({to: '/account'})
  })

  it('should render logout button', () => {
    expect(wrapper.find('button.logout').length).to.equal(1)
  })

  it('should hide right menu if user is logged out', () => {
    wrapper = mount(
      <MemoryRouter>
        <Header isLoggedIn={false} logout={logout} />
      </MemoryRouter>
    )
    expect(wrapper.find('.nav-right').prop('style')).to.deep.equal({display: 'none'})
  })

  it('should call logout when logout button is clicked', () => {
    wrapper.find('button.logout').simulate('click')
    expect(logout.calledOnce).to.be.true
  })
})
