import React from 'react'
import App from './app'
import {shallow} from 'enzyme'

describe('<App />', () => {
  it('renders', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).to.be.ok
  })
})
