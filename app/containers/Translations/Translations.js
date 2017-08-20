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
  paginationLimitCountChange,
  selectTranslation,
  deselectTranslation,
  getTranslationGroupsRequest,
  selectTranslationGroup,
  deselectTranslationGroup,
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
  const [languages, recentlySelectedLanguages] = getMappedLanguages(state)
  return {
    translations: applyFilters(state),
    selectedTranslations: translations.selectedTranslations,
    uploadTranslationsData: translations.uploadData,
    addTranslationModalIsOpened: translations.addTranslationModalIsOpened,
    translationsAreLoading: translations.translationsAreLoading,
    selectedLanguage: translations.selectedLanguage,
    pagination: translations.pagination,
    groups: translations.groups,
    selectedGroups: translations.selectedGroups,
    recentlySelectedLanguages,
    languages
  }
}

const mapDispatch = (dispatch) => {
  return {
    addTranslation: (translation) => dispatch(addTranslationRequest(translation)),
    selectTranslation: (_id) => dispatch(selectTranslation(_id)),
    deselectTranslation: (_id) => dispatch(deselectTranslation(_id)),
    removeTranslation: (_id) => dispatch(removeTranslationRequest(_id)),
    updateTranslation: (_id, value) => dispatch(updateTranslationRequest(_id, value)),
    getLanguages: () => dispatch(getLanguagesRequest()),
    getTranslations: () => dispatch(getTranslationsRequest()),
    openAddTranslationModal: () => dispatch(openAddTranslationModal()),
    closeAddTranslationModal: () => dispatch(closeAddTranslationModal()),
    selectLanguage: (key) => dispatch(selectLanguage(key)),
    searchFilterChange: (searchValue) => dispatch(searchFilterChange(searchValue)),
    getUploadTranslations: () => dispatch(uploadTranslationsRequest()),
    paginationLimitCountChange: (limit) => dispatch(paginationLimitCountChange(limit)),
    getTranslationGroups: () => dispatch(getTranslationGroupsRequest()),
    selectTranslationGroup: (group) => dispatch(selectTranslationGroup(group)),
    deselectTranslationGroup: (group) => dispatch(deselectTranslationGroup(group))
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
      getTranslationGroups
    } = this.props

    getLanguages()
    getTranslations()
    getTranslationGroups()
  }

  delayGetUploadTranslations() {
    this.props.getUploadTranslations()
  }

  componentWillReceiveProps(nextProps) {
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
      recentlySelectedLanguages,
      pagination,
      paginationLimitCountChange,
      getTranslations,
      selectTranslation,
      deselectTranslation,
      selectedTranslations,
      selectTranslationGroup,
      deselectTranslationGroup,
      user,
      groups,
      selectedGroups
    } = this.props

    return (
      <div>
        <ActionBar
          languages={languages}
          onLanguageChange={selectLanguage}
          selectedLanguage={selectedLanguage}
          recentlySelectedLanguages={recentlySelectedLanguages}
          openAddTranslationModal={openAddTranslationModal}
          searchFilterChange={searchFilterChange}
          uploadToken={user.uploadToken}
          groups={groups}
          selectTranslationGroup={selectTranslationGroup}
          deselectTranslationGroup={deselectTranslationGroup}
          selectedGroups={selectedGroups}
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
                selectTranslation={selectTranslation}
                deselectTranslation={deselectTranslation}
                selectedTranslations={selectedTranslations}
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
          groups={groups}
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
  recentlySelectedLanguages: PropTypes.arrayOf(languageShape),
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
  paginationLimitCountChange: PropTypes.func,
  selectTranslation: PropTypes.func,
  deselectTranslation: PropTypes.func,
  selectedTranslations: PropTypes.array,
  getTranslationGroups: PropTypes.func,
  groups: PropTypes.arrayOf(PropTypes.string),
  selectTranslationGroup: PropTypes.func,
  deselectTranslationGroup: PropTypes.func,
  selectedGroups: PropTypes.arrayOf(PropTypes.string)
}

export default connect(mapState, mapDispatch)(Translations)
