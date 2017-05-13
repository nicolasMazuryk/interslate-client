import React from 'react'
import Translations from './translations'
import {shallow} from 'enzyme'

describe('<Translations />', () => {
  it('should render', () => {
    const wrapper = shallow(<Translations />)
    expect(wrapper).to.be.ok
  })
})
