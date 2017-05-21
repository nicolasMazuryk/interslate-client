import React from 'react'
import Main from './Main'
import {shallow} from 'enzyme'
import Header from 'components/Header/Header'
import {Switch, Route} from 'react-router-dom'

describe('<Main />', () => {

  let wrapper

  before(() => {
    wrapper = shallow(<Main />)
  })

  it('should render header', () => {
    expect(wrapper.find(Header).length).to.equal(1)
  })

  it('should render Switch', () => {
    expect(wrapper.find(Switch).length).to.equal(1)
  })

  it('should render at least one route', () => {
    expect(wrapper.find(Route).length >= 1).to.be.true
  })

})
