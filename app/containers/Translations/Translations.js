import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
  addTranslationRequest,
  getLanguagesRequest,
  getTranslationsRequest,
  closeAddTranslationModal,
  selectLanguage,
  openAddTranslationModal,
  removeTranslationRequest,
  updateTranslationRequest,
  searchFilterChange
} from 'core/translations/actions'
import {
  applyFilters,
  getMappedLanguages
} from 'core/translations/selectors'
import AddTranslationModal from 'components/AddTranslationModal/AddTranslationModal'
import TranslationsTable from 'components/TranslationsTable/TranslationsTable'
import ActionBar from 'components/ActionBar/ActionBar'
import JSONViewer from 'components/JSONViewer/JSONViewer'
import Loader from 'common/Loader/Loader'

const mapState = (state) => {
  const {translations} = state
  return {
    translations: applyFilters(state),
    addTranslationModalIsOpened: translations.addTranslationModalIsOpened,
    translationsAreLoading: translations.translationsAreLoading,
    selectedLanguage: translations.selectedLanguage,
    languages: getMappedLanguages(state)
  }
}

const mapDispatch = (dispatch) => {
  return {
    addTranslation: (translation) => dispatch(addTranslationRequest(translation)),
    removeTranslation: (_id) => dispatch(removeTranslationRequest(_id)),
    updateTranslation: (_id, value) => dispatch(updateTranslationRequest(_id, value)),
    getLanguages: () => dispatch(getLanguagesRequest()),
    getTranslations: () => dispatch(getTranslationsRequest()),
    openAddTranslationModal: () => dispatch(openAddTranslationModal()),
    closeAddTranslationModal: () => dispatch(closeAddTranslationModal()),
    selectLanguage: (key) => dispatch(selectLanguage(key)),
    searchFilterChange: (searchValue) => dispatch(searchFilterChange(searchValue)),
    uploadTranslationsFile: () => dispatch(getTranslationsRequest('file'))
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

  componentWillReceiveProps(nextProps) {
    const {
      languages,
      selectedLanguage,
      selectLanguage
    } = nextProps

    if (!selectedLanguage && languages.length) {
      const first = languages[0].key
      selectLanguage(first)
    }
  }

  render() {
    const {
      translations,
      addTranslation,
      removeTranslation,
      updateTranslation,
      openAddTranslationModal,
      closeAddTranslationModal,
      addTranslationModalIsOpened,
      translationsAreLoading,
      languages,
      selectLanguage,
      selectedLanguage,
      searchFilterChange,
      uploadTranslationsFile
    } = this.props

    return (
      <div>
        <ActionBar
          languages={languages}
          onLanguageChange={selectLanguage}
          selectedLanguage={selectedLanguage}
          openAddTranslationModal={openAddTranslationModal}
          searchFilterChange={searchFilterChange}
          uploadTranslationsFile={uploadTranslationsFile}
        />
          {translationsAreLoading ?
            (
              <div className="container"><Loader /></div>
            ) :
            (
              <div className="container">
                <div className="columns">
                  <div className="column is-two-thirds">
                    <TranslationsTable
                      onTranslationRemove={removeTranslation}
                      onTranslationUpdate={updateTranslation}
                      translations={translations}
                    />
                  </div>
                  <div className="column is-one-third">
                    <JSONViewer json={translations} />
                  </div>
                </div>
              </div>
            )
          }
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

const languageShape = PropTypes.shape({
  key: PropTypes.string,
  value: PropTypes.string
})

const translationShape = PropTypes.shape({
  key: PropTypes.string,
  translations: PropTypes.array,
  _id: PropTypes.string
})

Translations.propTypes = {
  addTranslationModalIsOpened: PropTypes.bool,
  translationsAreLoading: PropTypes.bool,
  translations: PropTypes.arrayOf(translationShape),
  languages: PropTypes.arrayOf(languageShape),
  selectedLanguage: PropTypes.string,
  openAddTranslationModal: PropTypes.func,
  addTranslation: PropTypes.func,
  removeTranslation: PropTypes.func,
  updateTranslation: PropTypes.func,
  getLanguages: PropTypes.func,
  getTranslations: PropTypes.func,
  closeAddTranslationModal: PropTypes.func,
  selectLanguage: PropTypes.func,
  searchFilterChange: PropTypes.func
}

export default connect(mapState, mapDispatch)(Translations)
