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
  searchFilterChange,
  uploadTranslationsRequest,
  paginationLimitCountChange
} from 'core/translations/actions'
import {
  applyFilters,
  getMappedLanguages
} from 'core/translations/selectors'
import AddTranslationModal from 'components/AddTranslationModal/AddTranslationModal'
import TranslationsTable from 'components/TranslationsTable/TranslationsTable'
import ActionBar from 'components/ActionBar/ActionBar'
import JSONViewer from 'components/JSONViewer/JSONViewer'

const mapState = (state) => {
  const {translations} = state
  return {
    translations: applyFilters(state),
    uploadTranslationsData: translations.uploadData,
    addTranslationModalIsOpened: translations.addTranslationModalIsOpened,
    translationsAreLoading: translations.translationsAreLoading,
    selectedLanguage: translations.selectedLanguage,
    pagination: translations.pagination,
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
    getUploadTranslations: () => dispatch(uploadTranslationsRequest()),
    paginationLimitCountChange: (limit) => dispatch(paginationLimitCountChange(limit))
  }
}

export class Translations extends PureComponent {

  componentDidMount() {
    const {
      getLanguages,
      getTranslations,
      getUploadTranslations
    } = this.props

    getLanguages()
    getTranslations()
    getUploadTranslations()
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
      uploadTranslationsData,
      pagination,
      paginationLimitCountChange,
      getTranslations,
      user
    } = this.props

    return (
      <div>
        <ActionBar
          languages={languages}
          onLanguageChange={selectLanguage}
          selectedLanguage={selectedLanguage}
          openAddTranslationModal={openAddTranslationModal}
          searchFilterChange={searchFilterChange}
          uploadToken={user.uploadToken}
        />
        <div className="container">
          <div className="columns">
            <div className="column is-two-thirds">
              <TranslationsTable
                onTranslationRemove={removeTranslation}
                onTranslationUpdate={updateTranslation}
                translations={translations}
                pagination={pagination}
                paginationLimitCountChange={paginationLimitCountChange}
                getTranslations={getTranslations}
                translationsAreLoading={translationsAreLoading}
              />
            </div>
            <div className="column is-one-third">
              <JSONViewer json={uploadTranslationsData} />
            </div>
          </div>
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
  user: PropTypes.object,
  addTranslationModalIsOpened: PropTypes.bool,
  translationsAreLoading: PropTypes.bool,
  translations: PropTypes.arrayOf(translationShape),
  languages: PropTypes.arrayOf(languageShape),
  selectedLanguage: PropTypes.string,
  uploadTranslationsData: PropTypes.object,
  pagination: PropTypes.object,
  openAddTranslationModal: PropTypes.func,
  addTranslation: PropTypes.func,
  removeTranslation: PropTypes.func,
  updateTranslation: PropTypes.func,
  getLanguages: PropTypes.func,
  getTranslations: PropTypes.func,
  closeAddTranslationModal: PropTypes.func,
  selectLanguage: PropTypes.func,
  searchFilterChange: PropTypes.func,
  getUploadTranslations: PropTypes.func,
  paginationLimitCountChange: PropTypes.func
}

export default connect(mapState, mapDispatch)(Translations)
