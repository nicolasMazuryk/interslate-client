import React from 'react'
import {shallow} from 'enzyme'
import ActionBar from './actionBar'

describe('<ActionBar />', () => {

  let
    wrapper

  before(() => {
    wrapper = shallow(<ActionBar/>)
  })

  it('should render upload button', () => {
    expect(wrapper.find('select[name="languages"]').length).to.equal(1)
  })

  it('should render add key button', () => {
    expect(wrapper.find('button[name="addKey"]').length).to.equal(1)
  })

  it('should render upload button', () => {
    expect(wrapper.find('button[name="upload"]').length).to.equal(1)
  })

})