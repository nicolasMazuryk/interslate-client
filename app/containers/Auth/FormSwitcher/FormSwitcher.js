import React from 'react'
import PropTypes from 'prop-types'

const FormSwitcher = ({type, changeType}) => {
  const isRegister = type === 'register'
  const text = isRegister  ? 'I have an account.' : 'Don\'t have an account?'
  return (
    <div className="level">
      <div className="level-left" />
      <div className="level-item">
        <span>{text}</span>
        <a
          className="button is-link"
          onClick={() => changeType(isRegister ? 'login' : 'register')}
        >{isRegister ? 'Login' : 'Register'}</a>
      </div>
    </div>
  )
}

FormSwitcher.propTypes = {
  type: PropTypes.oneOf(['register', 'login']),
  changeType: PropTypes.func
}

export default FormSwitcher
