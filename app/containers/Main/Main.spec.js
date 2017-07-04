import React from 'react'
import {Main} from './Main'
import {shallow} from 'enzyme'
import Header from 'components/Header/Header'
import {Switch, Route} from 'react-router-dom'
import PrivateRoute from 'common/PrivateRoute/PrivateRoute'

describe('<Main />', () => {
  let wrapper

  before(() => {
    wrapper = shallow(
      <Main
        isLoggedIn={false}
        logout={() => {}}
      />
    )
  })

  it('should render header', () => {
    expect(wrapper.find(Header).length).to.equal(1)
  })

  it('should render Switch', () => {
    expect(wrapper.find(Switch).length).to.equal(1)
  })

  it('should render a route', () => {
    expect(wrapper.find(Route)).to.have.length(1)
  })

  it('should render a private routes', () => {
    expect(wrapper.find(PrivateRoute)).to.have.length(2)
  })
})
