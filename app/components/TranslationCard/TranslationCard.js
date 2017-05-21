import React from 'react'
import PropTypes from 'prop-types'

const TranslationCard = (props) => {
  const {
    translation: {value, key}
  } = props

  return (
    <div className="message">
      <div className="message-header" style={{justifyContent: 'flex-end'}}>
        <button className="delete" />
      </div>
      <div className="message-body">
        <div className="level">

          <div className="level-left">
            <div className="field is-horizontal has-addons">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  name="key"
                  placeholder="Key"
                  value={key}
                />
              </p>
              <p className="control">
                <button name="save-key" className="button is-success">
                  Save
                </button>
              </p>
            </div>
          </div>

          <div className="level-right">
            <div className="field is-horizontal has-addons">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  name="value"
                  placeholder="Key"
                  value={value}
                />
              </p>
              <p className="control">
                <button name="save-value" className="button is-success">
                  Save
                </button>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

TranslationCard.propTypes = {
  translation: PropTypes.objectOf(PropTypes.string),
}

export default TranslationCard