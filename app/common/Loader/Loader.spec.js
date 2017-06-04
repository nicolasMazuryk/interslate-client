import React from 'react'
import {shallow} from 'enzyme'
import Loader from 'common/Loader/Loader'

describe('<Loader />', () => {

  let wrapper, style

  before(() => {
    style = {
      width: '10px',
      height: '10px'
    }
    wrapper = shallow(
      <Loader
        style={style}
      />
    )
  })

  it('should render loader', () => {
    expect(wrapper.find('.loader')).to.have.length(1)
  })

  it('should have proper style', () => {
    expect(wrapper.find('.loader').prop('style')).to.deep.equal(style)
  })

})