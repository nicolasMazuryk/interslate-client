import React from 'react'
import {shallow} from 'enzyme'
import Panel from 'common/Panel/Panel'

describe('<Panel />', () => {
  let wrapper, style, child

  before(() => {
    child = <div className="child" />
    style = {
      justifyContent: 'flex-start'
    }
    wrapper = shallow(
      <Panel align="start">
        {child}
      </Panel>
    )
  })

  it('should render panel aligned to left', () => {
    expect(wrapper.find('.panel .panel-block').prop('style')).to.deep.equal(style)
  })

  it('should render children inside panel-block', () => {
    expect(wrapper.find('.panel-block').containsMatchingElement(child)).to.be.true
  })
})
