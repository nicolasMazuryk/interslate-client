import React from 'react'
import {mount} from 'enzyme'
import Fade from 'common/Fade/Fade'

describe('<Fade />', () => {
  let wrapper, show

  before(() => {
    show = true
    wrapper = mount(
      <Fade
        show={show}
      />
    )
  })

  it('should have property display set to block', () => {
    expect(wrapper.find('div').prop('style').display).to.equal('block')
  })

  it('should have property display set to none', () => {
    wrapper.setProps({show: false})
    expect(wrapper.find('div').prop('style').display).to.equal('none')
  })
})
