import React from 'react'
import PropTypes from 'prop-types'
import Prism from 'prismjs'

const JSONViewer = (props) => {
  const style = {
    height: '70vh',
    overflow: 'scroll',
  }
  const json = Prism.highlight(JSON.stringify(props.json, null, 2), Prism.languages.javascript)

  return (
    <div className="field">
      <p className="control">
        <pre style={style}>
          <code dangerouslySetInnerHTML={{__html: json}} />
        </pre>
      </p>
    </div>
  )
}

JSONViewer.propTypes = {
  json: PropTypes.object
}

export default JSONViewer
