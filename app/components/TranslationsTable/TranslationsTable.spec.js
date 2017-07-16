import React from 'react'
import {mount} from 'enzyme'
import TranslationsTable from './TranslationsTable'
import TranslationsRow from './TranslationsRow/TranslationsRow'
import Pagination from 'common/Pagination/Pagination'
import Fade from 'common/Fade/Fade'
import sinon from 'sinon'

describe('<TranslationsTable />', () => {
  let wrapper,
    translations,
    pagination,
    translationsAreLoading,
    onTranslationRemove,
    onTranslationUpdate,
    getTranslations

  before(() => {
    pagination = {
      total: 3,
      limit: 10
    }
    translationsAreLoading = false
    translations = {
      _id1: {key: 'key1', values: [{translation: 'value1'}], _id: '_id1'},
      _id2: {key: 'key2', values: [{translation: 'value2'}], _id: '_id2'},
      _id3: {key: 'key3', values: [{translation: 'value3'}], _id: '_id3'},
    }
    onTranslationUpdate = sinon.spy()
    onTranslationRemove = sinon.spy()
    getTranslations = sinon.spy()
    wrapper = mount(
      <TranslationsTable
        pagination={pagination}
        translationsAreLoading={translationsAreLoading}
        translations={translations}
        getTranslations={getTranslations}
        onTranslationUpdate={onTranslationUpdate}
        onTranslationRemove={onTranslationRemove}
      />
    )
  })

  it('should render table', () => {
    expect(wrapper.find('table')).to.have.length(1)
  })

  it('should render fade block', () => {
    expect(wrapper.find(Fade)).to.have.length(1)
  })

  it('should render translations as table rows', () => {
    expect(wrapper.find(TranslationsRow)).to.have.length(3)
  })

  it('should render pagination', () => {
    expect(wrapper.find(Pagination)).to.have.length(1)
  })

  it('should render row with "no data is available" text', () => {
    const noDataIsAvailableText = 'No data is available'
    wrapper = mount(
      <TranslationsTable
        pagination={pagination}
        translations={{}}
        getTranslations={getTranslations}
        onTranslationUpdate={onTranslationUpdate}
        onTranslationRemove={onTranslationRemove}
      />
    )

    expect(wrapper.find('tbody tr').first().text()).to.equal(noDataIsAvailableText)
  })
})
