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
import {throttle} from 'core/utils'

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

  constructor(props) {
    super(props)

    this.delayGetUploadTranslations = throttle(this.delayGetUploadTranslations.bind(this), 500)
  }

  componentDidMount() {
    const {
      getLanguages,
      getTranslations,
    } = this.props

    getLanguages()
    getTranslations()
  }

  delayGetUploadTranslations() {
    this.props.getUploadTranslations()
  }

  componentWillReceiveProps(nextProps) {
    const {
      languages,
      selectedLanguage,
      selectLanguage,
    } = nextProps

    if (!selectedLanguage && languages.length) {
      const first = languages[0].key
      selectLanguage(first)
    }

    if (this.props.translations !== nextProps.translations) {
      this.delayGetUploadTranslations()
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

const paginationShape = PropTypes.shape({
  total: PropTypes.number,
  skip: PropTypes.number,
  limit: PropTypes.number
})

Translations.propTypes = {
  user: PropTypes.object.isRequired,
  addTranslationModalIsOpened: PropTypes.bool,
  translationsAreLoading: PropTypes.bool,
  translations: PropTypes.object.isRequired,
  languages: PropTypes.arrayOf(languageShape).isRequired,
  selectedLanguage: PropTypes.string,
  uploadTranslationsData: PropTypes.object.isRequired,
  pagination: paginationShape.isRequired,
  openAddTranslationModal: PropTypes.func,
  addTranslation: PropTypes.func,
  removeTranslation: PropTypes.func,
  updateTranslation: PropTypes.func,
  getLanguages: PropTypes.func.isRequired,
  getTranslations: PropTypes.func.isRequired,
  closeAddTranslationModal: PropTypes.func,
  selectLanguage: PropTypes.func,
  searchFilterChange: PropTypes.func,
  getUploadTranslations: PropTypes.func,
  paginationLimitCountChange: PropTypes.func
}

export default connect(mapState, mapDispatch)(Translations)
