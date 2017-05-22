import React from 'react'
import {shallow, mount} from 'enzyme'
import TranslationField from './TranslationField'
import Select from 'common/Select/Select'
import sinon from 'sinon'

describe('<TranslationField />', () => {

  let wrapper, translation, languages,
    onAdd, onRemove, index

  before(() => {
    index = 0
    onAdd = sinon.spy()
    onRemove = sinon.spy()
    translation = {
      language: 'en',
      translation: 'Test'
    }
    languages = [
      {key: 'en', value: 'English'},
      {key: 'fr', value: 'France'}
    ]
    wrapper = mount(
      <TranslationField
        translation={translation}
        languages={languages}
        index={index}
        onAdd={onAdd}
        onRemove={onRemove}
      />
    )
  })

  it('should call onRemove prop when remove button is clicked', () => {
    wrapper.find('button[name="remove"]').simulate('click', {
      preventDefault: () => {}
    })
    expect(onRemove.calledOnce).to.be.true
  })
  
  it('should change language when select option is changed', () => {
    const value = 'ru'
    wrapper.find(Select).simulate('change', {
      target: {
        getAttribute: () => 'language',
        value
      }
    })
    expect(wrapper.state('language')).to.equal(value)
  })
  
  it('should set translation prop into translation input', () => {
    expect(wrapper.find('input[name="translation"]').prop('value')).to.equal(translation.translation)
  })
  
  it('should change translation when input value changes', () => {
    const value = 'Test'
    wrapper.find('input[name="translation"]').simulate('change', {
      target: {
        getAttribute: () => 'translation',
        value
      }
    })
    expect(wrapper.state('translation')).to.equal(value)
  })
  
  it('should have defined language key', () => {
    expect(wrapper.state('language')).to.equal(translation.language)
  })
  
  it('should pick first language key if translation prop is not provided', () => {
    const languages = [
      {key: 'fr', value: 'France'}
    ]
    const wrapper = mount(
      <TranslationField
        languages={languages}
        index={index}
        onAdd={onAdd}
        onRemove={onRemove}
      />
    )
    
    expect(wrapper.state('language')).to.equal(languages[0].key)
  })

})