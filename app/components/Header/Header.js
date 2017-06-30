import React from 'react'
import PropTypes from 'prop-types'

const Header = ({logout}) => {
  return (
    <nav className="nav has-shadow">
      <div className="nav-left">
        <a className="nav-item">
          <img
            className="logotype"
            src="http://bulma.io/images/bulma-logo.png"
            alt="Interslate logo"
          />
        </a>
      </div>
      <div className="nav-right nav-menu">
        <a onClick={logout} className="nav-item logout">
          Logout
        </a>
      </div>
    </nav>
  )
}

Header.propTypes = {
  logout: PropTypes.func
}

export default Header
