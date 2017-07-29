import React from 'react'
import PropTypes from 'prop-types'

const Fade = (props) => {
  const {
    style,
    children,
    show
  } = props
  
  const defaultStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'white',
    opacity: '0.6',
    display: show ? 'block' : 'none'
  }
  
  return (
    <div style={{...defaultStyle, ...style}}>
      {children}
    </div>
  )
}

Fade.propTypes = {
  style: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  show: PropTypes.bool
}

export default Fade
