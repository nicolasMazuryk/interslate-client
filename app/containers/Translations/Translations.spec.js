import React from 'react'
import {Translations} from './Translations'
import {mount} from 'enzyme'
import ActionBar from 'components/ActionBar/ActionBar'
import AddTranslationModal from 'components/AddTranslationModal/AddTranslationModal'
import TranslationsTable from 'components/TranslationsTable/TranslationsTable'
import JSONViewer from 'components/JSONViewer/JSONViewer'
import sinon from 'sinon'

describe('<Translations />', () => {
  let wrapper, user, languages, pagination,
    selectedLanguage, selectLanguage,
    translations, uploadTranslationsData,
    getLanguages, getTranslations,
    getUploadTranslations, groups,
    getTranslationGroups, selectedGroups

  before(() => {
    user = {
      email: 'test@mail.com',
      uploadToken: '12345'
    }
    languages = [
      {key: 'ru', value: 'Russian'},
      {key: 'en', value: 'English'},
      {key: 'fr', value: 'French'}
    ]
    translations = {}
    groups = []
    selectedGroups = []
    uploadTranslationsData = {}
    pagination = {
      limit: 0,
      skip: 0,
      total: 10
    }
    selectedLanguage = 'ru'
    selectLanguage = sinon.spy()
    getLanguages = sinon.spy()
    getUploadTranslations = sinon.spy()
    getTranslations = sinon.spy()
    getTranslationGroups = sinon.spy()
    wrapper = mount(
      <Translations
        languages={languages}
        translations={translations}
        uploadTranslationsData={uploadTranslationsData}
        getUploadTranslations={getUploadTranslations}
        selectedLanguage={selectedLanguage}
        selectLanguage={selectLanguage}
        getLanguages={getLanguages}
        getTranslations={getTranslations}
        user={user}
        pagination={pagination}
        getTranslationGroups={getTranslationGroups}
        groups={groups}
        selectedGroups={selectedGroups}
      />
    )
  })

  it('should get languages', () => {
    expect(getLanguages.calledOnce).to.be.true
  })

  it('should get translations', () => {
    expect(getLanguages.calledOnce).to.be.true
  })

  it('should not select first language', () => {
    selectLanguage.reset()
    wrapper.setProps({selectedLanguage: '', languages: []})
    expect(selectLanguage.notCalled).to.be.true
  })

  it('should render action bar', () => {
    expect(wrapper.find(ActionBar)).to.have.length(1)
  })

  it('should render translation modal', () => {
    expect(wrapper.find(AddTranslationModal)).to.have.length(1)
  })

  it('should render translations table if translations are loaded', () => {
    expect(wrapper.find(TranslationsTable)).to.have.length(1)
  })

  it('should render JSON viewer', () => {
    expect(wrapper.find(JSONViewer)).to.have.length(1)
  })
})
