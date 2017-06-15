import React from 'react'
import {mount} from 'enzyme'
import TranslationsTable from './TranslationsTable'
import TranslationsRow from './TranslationsRow/TranslationsRow'
import sinon from 'sinon'

describe('<TranslationsTable />', () => {

  let wrapper, translations,
    onTranslationRemove,
    onTranslationUpdate

  before(() => {
    translations = [
      {key: 'key1', value: 'value1', _id: '_id1'},
      {key: 'key2', value: 'value2', _id: '_id2'},
      {key: 'key3', value: 'value3', _id: '_id3'},
    ]
    onTranslationUpdate = sinon.spy()
    onTranslationRemove = sinon.spy()
    wrapper = mount(
      <TranslationsTable
        translations={translations}
        onTranslationUpdate={onTranslationUpdate}
        onTranslationRemove={onTranslationRemove}
      />
    )
  })

  it('should render table', () => {
    expect(wrapper.find('table')).to.have.length(1)
  })

  it('should render translations as table rows', () => {
    expect(wrapper.find(TranslationsRow)).to.have.length(3)
  })

  it('should render row with "no data is available" text', () => {
    const noDataIsAvailableText = 'No data is available'
    wrapper = mount(
      <TranslationsTable
        translations={[]}
        onTranslationUpdate={onTranslationUpdate}
        onTranslationRemove={onTranslationRemove}
      />
    )

    expect(wrapper.find('tbody tr').first().text()).to.equal(noDataIsAvailableText)
  })

})