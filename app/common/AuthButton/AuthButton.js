import React from 'react'
import PropTypes from 'prop-types'

const AuthButton = (props) => {
  const {
    text,
    onClick,
  } = props

  return (
    <div style={{paddingTop: '4%'}} className="level">
      <div className="level-item">
        <button
          style={{width: '100%'}}
          type="submit"
          onClick={onClick}
          name="enter"
          className="button is-primary"
        >
          {text}
        </button>
      </div>
    </div>
  )
}

AuthButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

export default AuthButton
