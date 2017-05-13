import React from 'react'
import Main from './main'
import {shallow} from 'enzyme'
import store from 'core/store'

describe('<Main />', () => {
  it('should render', () => {
    const wrapper = shallow(<Main store={store} />)
    expect(wrapper).to.be.ok
  })
})
