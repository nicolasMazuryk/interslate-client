import React from 'react'
import {shallow} from 'enzyme'
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
    wrapper = shallow(
      <TranslationField
        translation={translation}
        languages={languages}
        index={index}
        onAdd={onAdd}
        onRemove={onRemove}
      />
    )
  })

  it('should render language select', () => {
    expect(wrapper.find(Select).prop('name')).to.equal('language')
  })

  it('should render remove button', () => {
    expect(wrapper.find('button').prop('name')).to.equal('remove')
  })

  it('should call onRemove prop when remove button is clicked', () => {
    wrapper.find('button[name="remove"]').simulate('click', {
      preventDefault: () => {}
    })
    expect(onRemove.calledOnce).to.be.true
  })

})