import React from 'react'
import PropTypes from 'prop-types'

const Loader = ({style = {}}) => {
  const defaultStyle = {
    height: '5em',
    width: '5em'
  }
  return (
    <div className="level">
      <div className="level-item">
        <div
          style={{
            ...defaultStyle,
            ...style
          }}
          className="loader"
        />
      </div>
    </div>
  )
}

Loader.propTypes = {
  style: PropTypes.object
}

export default Loader