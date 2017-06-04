import React from 'react'
import PropTypes from 'prop-types'

const AuthButton = (props) => {
  const {
    onClick
  } = props

  return (
    <div className="level">
      <div className="level-left" />
      <div className="level-right">
        <div className="level-item">
          <button
            type="submit"
            onClick={onClick}
            name="enter"
            className="button is-primary"
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  )
}

AuthButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default AuthButton
