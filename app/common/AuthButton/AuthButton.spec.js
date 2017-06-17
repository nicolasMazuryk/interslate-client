import React from 'react'
import {mount} from 'enzyme'
import AuthButton from './AuthButton'
import sinon from 'sinon'

describe('<AuthButton />', () => {

  let wrapper, text, onClick

  before(() => {
    text = 'test'
    onClick = sinon.spy()
    wrapper = mount(
      <AuthButton
        text={text}
        onClick={onClick}
      />
    )
  })

  it('should render button with proper text', () => {
    expect(wrapper.find('button').text()).to.equal(text)
  })

  it('should call onClick callback when button is clicked', () => {
    wrapper.find('button').simulate('click')
    expect(onClick.calledOnce).to.be.true
  })

})