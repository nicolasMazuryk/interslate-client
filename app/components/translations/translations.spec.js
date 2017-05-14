import React from 'react'
import Translations from './translations'
import {shallow} from 'enzyme'
import store from 'core/store'

describe('<Translations />', () => {
  it('should render', () => {
    const wrapper = shallow(<Translations store={store} />)
    expect(wrapper).to.be.ok
  })
})
