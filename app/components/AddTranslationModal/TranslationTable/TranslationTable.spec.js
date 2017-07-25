import React from 'react'
import {shallow} from 'enzyme'
import sinon from 'sinon'
import TranslationTable from './TranslationTable'

describe('<TranslationTable />', () => {
  let wrapper,
    translations,
    onRemove,
    languages

  before(() => {
    onRemove = sinon.spy()
    languages = [{key: 'ru', value: 'Russian'}]
    translations = [
      {language: 'ru', translation: 'Тест'}
    ]
    wrapper = shallow(
      <TranslationTable
        languages={languages}
        translations={translations}
        onRemove={onRemove}
      />
    )
  })

  it('should render rows with translations', () => {
    expect(wrapper.find('tbody tr')).to.have.length(translations.length)
  })

  it('should render rows with provided translations', () => {
    const row = wrapper.find('tbody tr').first()
    const expected = ['Russian (ru)', 'Тест']
    const actual = [
      row.find('td').at(0).text(),
      row.find('td').at(1).text()
    ]

    expect(actual).to.deep.equal(expected)
  })

  it('should call onRemove callback when remove button is clicked', () => {
    const index = 0
    wrapper.find('button[name="remove"]').at(index).simulate('click', {
      preventDefault: () => {}
    })

    expect(onRemove.calledWith(index)).to.be.true
  })
})
