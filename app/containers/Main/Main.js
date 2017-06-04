import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Switch, Route} from 'react-router-dom'
import Translations from 'containers/Translations/Translations'
import Login from 'containers/Login/Login'
import Header from 'components/Header/Header'
import Private from 'common/PrivateRoute/PrivateRoute'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutRequest} from 'core/auth/actions'

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logoutRequest())
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.user
  }
}

export class Main extends PureComponent {

  render() {
    const {
      logout,
      isLoggedIn
    } = this.props

    return (
      <main>
        <Header isLoggedIn={isLoggedIn} logout={logout} />
        <Switch>
          <Route path="/login" component={Login} />
          <Private exact path="/" isLoggedIn={isLoggedIn} component={Translations} />
        </Switch>
      </main>
    )
  }
  
}

Main.propTypes = {
  logout: PropTypes.func,
  isLoggedIn: PropTypes.bool
}

export default withRouter(connect(mapState, mapDispatch)(Main))