import React from 'react'
import PropTypes from 'prop-types'

const JSONViewer = (props) => {
  const style = {
    height: '70vh',
    overflow: 'scroll'
  }
  const json = JSON.stringify(props.json, null, 2)

  return (
    <div className="field">
      <p className="control">
        <textarea
          style={style}
          className="textarea"
          value={json}
          disabled
        />
      </p>
    </div>
  )
}

JSONViewer.propTypes = {
  json: PropTypes.object
}

export default JSONViewer
