import React from 'react'
import PropTypes from 'prop-types'
import Code from 'common/Code/Code'

const JSONViewer = (props) => {
  return (
    <div className="field">
      <div className="control">
        <Code
          data={props.json}
          withHTML={false}
        />
      </div>
    </div>
  )
}

JSONViewer.propTypes = {
  json: PropTypes.object
}

export default JSONViewer
