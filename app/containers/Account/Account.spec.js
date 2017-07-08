import React from 'react'
import {mount} from 'enzyme'
import {Account} from './Account'
import sinon from 'sinon'
import AsideMenu from 'common/AsideMenu/AsideMenu'
import {Route, MemoryRouter} from 'react-router-dom'
import Profile from './Profile/Profile'

describe('<Account />', () => {
  let wrapper, location,
    history, push
  
  before(() => {
    push = sinon.spy()
    location = {
      pathname: '/account'
    }
    history = {push}
    wrapper = mount(
      <MemoryRouter>
        <Account
          history={history}
          location={location}
        />
      </MemoryRouter>
    )
  })
  
  it('should redirect to /api-key page', () => {
    expect(push.calledWith('/account/api-key')).to.be.true
  })
  
  it('should not redirect to /api-key page', () => {
    push.reset()
    wrapper.setProps({location: {pathname: '/account/profile'}})
    expect(push.notCalled).to.be.true
  })
  
  it('should render AsideMenu', () => {
    expect(wrapper.find(AsideMenu)).to.have.length(1)
  })
  
  it('should render route for api-key page', () => {
    const path = '/account/api-key'
    expect(wrapper.find(Route).get(0).props.path).to.equal(path)
  })
  
  it('should render route for profile page', () => {
    const expected = {
      path: '/account/profile',
      component: Profile
    }
    expect(wrapper.find(Route).get(1).props).to.deep.equal(expected)
  })
})
