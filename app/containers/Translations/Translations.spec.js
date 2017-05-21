import React from 'react'
import {Translations} from './Translations'
import {shallow} from 'enzyme'
import sinon from 'sinon'
import ActionBar from 'components/ActionBar/ActionBar'
import AddTranslationModal from 'components/AddTranslationModal/AddTranslationModal'
import Loader from 'common/Loader/Loader'

describe('<Translations />', () => {

  let
    wrapper, renderCards

  before(() => {
    renderCards = sinon.spy(Translations.prototype, 'renderCards')
    wrapper = shallow(
      <Translations
        translationsAreLoading={false}
        translations={[]}
      />
    )
  })

  it('should render action bar', () => {
    expect(wrapper.find(ActionBar).length).to.equal(1)
  })

  it('should render translation modal', () => {
    expect(wrapper.find(AddTranslationModal).length).to.equal(1)
  })

  it('should render loader if translations are loading', () => {
    const wrapper = shallow(
      <Translations
        translationsAreLoading={true}
        translations={[]}
      />
    )
    expect(wrapper.find(Loader).length).to.equal(1)
  })

  it('should render cards if translations are loaded', () => {
    expect(renderCards.calledOnce).to.be.true
  })

})
