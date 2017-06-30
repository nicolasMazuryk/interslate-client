import React from 'react'
import {shallow} from 'enzyme'
import Header from './Header'
import sinon from 'sinon'

describe('<Header />', () => {
  let
    wrapper = null,
    logout = null

  before(() => {
    logout = sinon.spy()
    wrapper = shallow(
      <Header logout={logout} />
    )
  })

  it('should render logotype image', () => {
    expect(wrapper.find('img.logotype').length).to.equal(1)
  })

  it('should render logout link', () => {
    expect(wrapper.find('a.logout').length).to.equal(1)
  })

  it('should call logout when logout link is clicked', () => {
    wrapper.find('a.logout').simulate('click')
    expect(logout.calledOnce).to.be.true
  })
})
