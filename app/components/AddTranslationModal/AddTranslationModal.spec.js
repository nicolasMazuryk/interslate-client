import React from 'react'
import {mount} from 'enzyme'
import AddTranslationModal from './AddTranslationModal'
import Modal from 'common/Modal/Modal'
import sinon from 'sinon'

describe('<AddTranslationModal />', () => {
  let
    wrapper, onSubmit,
    onClose, opened, languages

  before(() => {
    opened = true
    onSubmit = sinon.spy()
    onClose = sinon.spy()
    languages = [
      {key: 'en', value: 'English'},
      {key: 'ru', value: 'Russian'},
      {key: 'fr', value: 'France'}
    ]
    wrapper = mount(
      <AddTranslationModal
        languages={languages}
        opened={opened}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    )
  })

  it('should render modal', () => {
    expect(wrapper.find(Modal)).to.have.length(1)
  })

  it('should render key input', () => {
    expect(wrapper.find({name: 'key'})).to.have.length(1)
  })

  it('should modify key prop in state when input value is changed', () => {
    const value = 'Test'
    const event = {
      target: {value}
    }
    wrapper.find('input[name="key"]').simulate('change', event)

    expect(wrapper.state('key')).to.equal(value)
  })

  it('should add translation', () => {
    const translation = {
      language: 'ru',
      translation: 'Тест'
    }
    wrapper.instance().onTranslationAdd(translation)
    expect(wrapper.state('translations')).to.deep.equal([translation])
  })

  it('should remove translation', () => {
    const wrapper = mount(
      <AddTranslationModal
        languages={languages}
        opened={opened}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    )
    const translations = [
      {language: 'ru', translation: 'Тест'},
      {language: 'en', translation: 'Test'},
      {language: 'fr', translation: 'Test'}
    ]
    const expected = [
      {language: 'en', translation: 'Test'}
    ]
    wrapper.instance().onTranslationAdd(translations[0])
    wrapper.instance().onTranslationAdd(translations[1])
    wrapper.instance().onTranslationRemove(0)

    expect(wrapper.state('translations')).to.deep.equal(expected)
  })

  it('should submit form with current state', () => {
    const event = {preventDefault: () => {}}
    const {key, translations} = wrapper.state()
    wrapper.instance().onSubmit(event)

    expect(onSubmit.calledWith(({key, values: translations}))).to.be.true
  })
})
