import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const getText = (pathname) => {
  if (pathname === '/enter/register')
    return 'I have an account.'
  if (pathname === '/enter/login')
    return 'Don\'t have an account?'
  if (pathname === '/enter/recover')
    return 'I remember my password.'
}

const getLink = (pathname) => {
  if (pathname === '/enter/login')
    return ['Register', '/enter/register']

  return ['Login', '/enter/login']
}

const FormSwitcher = ({pathname}) => {
  const [buttonText, path] = getLink(pathname)
  return (
    <div className="level">
      <div className="level-left" />
      <div className="level-item">
        <span>
          {getText(pathname)}
        </span>
        <Link className="button is-link" to={path}>{buttonText}</Link>
      </div>
    </div>
  )
}

FormSwitcher.propTypes = {
  pathname: PropTypes.oneOf(['/enter/register', '/enter/login', '/enter/recover']),
}

export default FormSwitcher
