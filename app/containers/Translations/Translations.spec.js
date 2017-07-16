import React from 'react'
import {Translations} from './Translations'
import {shallow} from 'enzyme'
import ActionBar from 'components/ActionBar/ActionBar'
import AddTranslationModal from 'components/AddTranslationModal/AddTranslationModal'
import TranslationsTable from 'components/TranslationsTable/TranslationsTable'
import JSONViewer from 'components/JSONViewer/JSONViewer'

describe('<Translations />', () => {
  let wrapper, user

  before(() => {
    user = {
      email: 'test@mail.com',
      uploadToken: '12345'
    }
    wrapper = shallow(
      <Translations
        translationsAreLoading={false}
        user={user}
        translations={{}}
      />
    )
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
