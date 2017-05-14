import React from 'react'
import {shallow} from 'enzyme'
import ActionBar from './actionBar'

describe('<ActionBar />', () => {

  let
    wrapper, languages

  before(() => {
    languages = [
      {key: 'ru', value: 'Russian'},
      {key: 'en', value: 'English'},
    ]
    wrapper = shallow(
      <ActionBar languages={languages}/>
    )
  })

  it('should render upload button', () => {
    expect(wrapper.find('select[name="languages"]').length).to.equal(1)
  })

  it('should render add key button', () => {
    expect(wrapper.find('button[name="addKey"]').length).to.equal(1)
  })

  it('should render upload button', () => {
    expect(wrapper.find('button[name="upload"]').length).to.equal(1)
  })

  it('should render language dropdown', () => {
    expect(wrapper.find('select > option').length).to.equal(2)
  })

  it('should render option with correct value prop', () => {
    const firstOption = wrapper.find('select > option').first()
    const firstLanguage = languages[0]

    expect(firstOption.prop('value')).to.equal(firstLanguage.key)
  })

  it('should render option with correct text', () => {
    const firstOption = wrapper.find('select > option').first()
    const firstLanguage = languages[0]

    expect(firstOption.text()).to.equal(firstLanguage.value)
  })

})