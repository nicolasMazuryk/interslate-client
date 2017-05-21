import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
  addTranslationRequest,
  getLanguagesRequest,
  getTranslationsRequest,
  closeAddTranslationModal,
  selectLanguage,
  openAddTranslationModal
} from './actions'
import {filterTranslationsByLanguage} from './selectors'
import TranslationCard from 'components/TranslationCard/TranslationCard'
import AddTranslationModal from 'components/AddTranslationModal/AddTranslationModal'
import ActionBar from 'components/ActionBar/ActionBar'
import Loader from 'common/Loader/Loader'

const mapState = (state) => {
  const {translations} = state
  return {
    translations: filterTranslationsByLanguage(state),
    addTranslationModalIsOpened: translations.addTranslationModalIsOpened,
    translationsAreLoading: translations.translationsAreLoading,
    selectedLanguage: translations.selectedLanguage,
    languages: translations.languages
  }
}

const mapDispatch = (dispatch) => {
  return {
    addTranslation: (translation) => dispatch(addTranslationRequest(translation)),
    getLanguages: () => dispatch(getLanguagesRequest()),
    getTranslations: () => dispatch(getTranslationsRequest()),
    openAddTranslationModal: () => dispatch(openAddTranslationModal()),
    closeAddTranslationModal: () => dispatch(closeAddTranslationModal()),
    selectLanguage: (key) => dispatch(selectLanguage(key))
  }
}

export class Translations extends PureComponent {

  componentDidMount() {
    const {
      getLanguages,
      getTranslations
    } = this.props

    getLanguages()
    getTranslations()
  }

  renderCards(translations) {
    return translations.map((translation, i) => (
      <div key={i} className="column">
        <div className="column is-half">
          <TranslationCard translation={translation} />
        </div>
      </div>
    ))
  }

  render() {
    const {
      translations,
      addTranslation,
      openAddTranslationModal,
      closeAddTranslationModal,
      addTranslationModalIsOpened,
      translationsAreLoading,
      languages,
      selectLanguage,
      selectedLanguage,
    } = this.props

    return (
      <div>
        <ActionBar
          languages={languages}
          onLanguageChange={selectLanguage}
          selectedLanguage={selectedLanguage}
          openAddTranslationModal={openAddTranslationModal}
        />
        <div className="container">
          {translationsAreLoading
            ? <Loader />
            : this.renderCards(translations)
          }
        </div>
        <AddTranslationModal
          opened={addTranslationModalIsOpened}
          onClose={closeAddTranslationModal}
          onSubmit={addTranslation}
          languages={languages}
          selectedLanguage={selectedLanguage}
        />
      </div>
    )
  }
}

Translations.propTypes = {
  addTranslationModalIsOpened: PropTypes.bool,
  translationsAreLoading: PropTypes.bool,
  translations: PropTypes.array,
  languages: PropTypes.array,
  selectedLanguage: PropTypes.string,
  openAddTranslationModal: PropTypes.func,
  addTranslation: PropTypes.func,
  getLanguages: PropTypes.func,
  getTranslations: PropTypes.func,
  closeAddTranslationModal: PropTypes.func,
  selectLanguage: PropTypes.func,
}

export default connect(mapState, mapDispatch)(Translations)
