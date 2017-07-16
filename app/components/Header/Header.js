import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const Header = ({logout, isLoggedIn}) => {
  const logoLinkPath = isLoggedIn ? '/translations' : '/'
  const rightMenuStyle = {display: isLoggedIn ? 'flex' : 'none'}

  return (
    <nav className="nav has-shadow">
      <div className="nav-left">
        <Link to={logoLinkPath} className="nav-item logotype-link">
          <img
            className="logotype"
            src="http://bulma.io/images/bulma-logo.png"
            alt="Interslate logo"
          />
        </Link>
      </div>
      <div style={rightMenuStyle} className="nav-right nav-menu">
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
