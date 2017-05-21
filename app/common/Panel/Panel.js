import React from 'react'
import PropTypes from 'prop-types'

const Panel = ({children, align}) => {
  const style = {
    justifyContent: `flex-${align}`
  }
  return (
    <nav className="panel">
      <div className="panel-block" style={style}>
        {children}
      </div>
    </nav>
  )
}

Panel.propTypes = {
  align: PropTypes.string,
  children: PropTypes.object
}

export default Panel

