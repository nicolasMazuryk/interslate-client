import React from 'react'
import PropTypes from 'prop-types'

const ActionBar = (props) => {
  const {
    languages,
    onLanguageChange,
    selectedLanguage
  } = props

  return (
    <nav className="panel">
      <div className="panel-block" style={{justifyContent: 'flex-end'}}>
        <div className="level">
          <div className="level-right">
            <p className="level-item">
              <span className="select">
                <select
                  value={selectedLanguage}
                  onChange={(e) => onLanguageChange(e.target.value)}
                  name="languages"
                >
                  {languages.map(({key, value}) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </span>
            </p>
            <p className="level-item">
              <button
                name="addKey"
                className="button is-primary is-inverted"
              >
                Add Key
              </button>
            </p>
            <p className="level-item">
              <button
                name="upload"
                className="button is-success"
              >
                Upload
              </button>
            </p>
          </div>
        </div>
      </div>
    </nav>
  )
}

ActionBar.propTypes = {
  languages: PropTypes.array,
  selectedLanguage: PropTypes.string,
  onLanguageChange: PropTypes.func
}

export default ActionBar