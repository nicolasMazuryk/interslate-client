import React from 'react'
import {mount} from 'enzyme'
import FormDivider from 'containers/Auth/FormDivider/FormDivider'

describe('<FormDivider />', () => {
  let wrapper, text

  before(() => {
    text = 'to'
    wrapper = mount(
      <FormDivider text={text} />
    )
  })

  it('should render level', () => {
    expect(wrapper.find('.level')).to.have.length(1)
  })

  it('should render level-item', () => {
    expect(wrapper.find('.level-item')).to.have.length(1)
  })

  it('should render text', () => {
    expect(wrapper.text()).to.contain(text)
  })
})
