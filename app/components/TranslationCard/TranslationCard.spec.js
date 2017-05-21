import React from 'react'
import {shallow} from 'enzyme'
import TranslationCard from './TranslationCard'

describe('<TranslationCard />', () => {

  let
    wrapper,
    translation,
    key, value

  before(() => {
    key = 'USER'
    value = 'User'
    translation = {
      key, value
    }
    wrapper = shallow(
      <TranslationCard
        translation={translation}
      />)
  })

  it('should render key input with translation key', () => {
    expect(wrapper.find('input[name="key"]').prop('value')).to.equal(key)
  })

  it('should render save key button', () => {
    expect(wrapper.find('button[name="save-key"]').length).to.equal(1)
  })

  it('should render value input button', () => {
    expect(wrapper.find('input[name="value"]').prop('value')).to.equal(value)
  })

  it('should render save value button', () => {
    expect(wrapper.find('button[name="save-value"]').length).to.equal(1)
  })

  it('should render delete button', () => {
    expect(wrapper.find('button.delete').length).to.equal(1)
  })

})