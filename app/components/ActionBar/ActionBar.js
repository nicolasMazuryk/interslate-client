import React from 'react'
import PropTypes from 'prop-types'
import Select from 'common/Select/Select'
import Panel from 'common/Panel/Panel'
import SearchFilter from 'components/SearchFilter/SearchFilter'

export const handleEvent = (next) => (e) => {
  return next(e.target.value)
}

const ActionBar = (props) => {
  const {
    languages,
    onLanguageChange,
    selectedLanguage,
    openAddTranslationModal,
    searchFilterChange,
    uploadToken
  } = props

  const uploadLink = `api/v1/uploads/translations?format=file&token=${uploadToken}`

  return (
    <Panel align='end'>
      <div className="level">
        <div className="level-right">
          <div className="level-item">
            <SearchFilter
              onChange={searchFilterChange}
            />
          </div>
          <div className="level-item">
            <Select
              options={languages}
              value={selectedLanguage}
              onChange={handleEvent(onLanguageChange)}
              name="languages"
            />
          </div>
          <div className="level-item">
            <button
              name="add-key"
              className="button is-primary is-inverted"
              onClick={openAddTranslationModal}
            >
              Add Key
            </button>
          </div>
          <div className="level-item">
            <a
              href={uploadLink}
              rel="noopener noreferrer"
              target="_blank"
              name="upload"
              className="button is-success"
            >
              Upload
            </a>
          </div>
        </div>
      </div>
    </Panel>
  )
}

ActionBar.propTypes = {
  languages: PropTypes.array,
  selectedLanguage: PropTypes.string,
  searchFilterChange: PropTypes.func,
  onLanguageChange: PropTypes.func,
  openAddTranslationModal: PropTypes.func,
  uploadToken: PropTypes.string
}

export default ActionBar
