import React from 'react'
import PropTypes from 'prop-types'
import Select from 'common/Select/Select'
import Panel from 'common/Panel/Panel'

export const handleEvent = (next) => (e) => {
  return next(e.target.value)
}

const ActionBar = (props) => {
  const {
    languages,
    onLanguageChange,
    selectedLanguage,
    openAddTranslationModal
  } = props

  return (
    <Panel align='end'>
      <div className="level">
        <div className="level-right">
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
            <button
              name="upload"
              className="button is-success"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </Panel>
  )
}

ActionBar.propTypes = {
  languages: PropTypes.array,
  selectedLanguage: PropTypes.string,
  onLanguageChange: PropTypes.func,
  openAddTranslationModal: PropTypes.func
}

export default ActionBar