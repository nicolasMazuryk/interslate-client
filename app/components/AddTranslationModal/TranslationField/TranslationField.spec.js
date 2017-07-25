import React from 'react'
import {mount} from 'enzyme'
import TranslationField from './TranslationField'
import Select from 'common/Select/Select'
import sinon from 'sinon'

describe('<TranslationField />', () => {
  let wrapper, availableLanguages, onAdd

  before(() => {
    onAdd = sinon.spy()
    availableLanguages = [
      {key: 'en', value: 'English'},
      {key: 'ru', value: 'Russian'},
      {key: 'fr', value: 'France'}
    ]
    wrapper = mount(
      <TranslationField
        languages={availableLanguages}
        onAdd={onAdd}
      />
    )
  })

  it('has defined language key', () => {
    expect(wrapper.state('language')).to.equal(availableLanguages[0].key)
  })

  it('should call onAdd with its state', () => {
    wrapper.setState({translation: 'test'})
    const state = wrapper.state()
    wrapper.find('button[name="add"]').simulate('click', {
      preventDefault: () => {}
    })
    expect(onAdd.calledWith(state)).to.be.true
  })

  it('should set translation to empty string', () => {
    wrapper.setState({
      language: 'ru',
      translation: 'Тест'
    })
    wrapper.find('button[name="add"]').simulate('click', {
      preventDefault: () => {}
    })
    expect(wrapper.state('translation')).to.equal('')
  })
  
  it('should change language when select option is changed', () => {
    const value = 'ru'
    const event = {
      target: {
        getAttribute: () => 'language',
        value
      }
    }
    wrapper.find('select[name="language"]').simulate('change', event)
    expect(wrapper.find(Select).prop('value')).to.equal(value)
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
})
