import React from 'react'
import Main from './main'
import {shallow} from 'enzyme'

describe('<Main />', () => {
  it('renders', () => {
    const wrapper = shallow(<Main />)
    expect(wrapper).to.be.ok
  })
})
