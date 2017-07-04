import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const Header = ({logout, isLoggedIn}) => {
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
      <div style={{display: isLoggedIn ? 'flex' : 'none'}} className="nav-right nav-menu">
        <div className="nav-item ">
          <Link to="/translations">Translations</Link>
        </div>
        <div className="nav-item">
          <Link to="/account">Account</Link>
        </div>
        <div className="nav-item">
          <button
            className="button logout"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

Header.propTypes = {
  logout: PropTypes.func,
  isLoggedIn: PropTypes.bool
}

export default Header
