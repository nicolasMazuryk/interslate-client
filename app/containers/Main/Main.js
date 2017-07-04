import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Switch, Route} from 'react-router-dom'
import Translations from 'containers/Translations/Translations'
import Account from 'containers/Account/Account'
import Auth from 'containers/Auth/Auth'
import Header from 'components/Header/Header'
import Private from 'common/PrivateRoute/PrivateRoute'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutRequest, getCurrentUserRequest} from 'core/main/actions'

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logoutRequest()),
    getCurrentUser: () => dispatch(getCurrentUserRequest())
  }
}

const mapState = ({main}) => {
  return {
    loading: main.loading,
    user: main.user
  }
}

export class Main extends PureComponent {
  
  componentDidMount() {
    this.props.getCurrentUser()
  }

  render() {
    const {
      logout,
      user,
    } = this.props

    return (
      <main>
        <Header isLoggedIn={!!user} logout={logout} />
          <Switch>
            <Route path="/enter" component={Auth} />
            <Private
              exact
              path="/translations"
              user={user}
              component={Translations}
            />
            <Private
              exact
              path="/account"
              user={user}
              component={Account}
            />
          </Switch>
      </main>
    )
  }
  
}

Main.propTypes = {
  logout: PropTypes.func,
  user: PropTypes.object,
  loading: PropTypes.bool,
  getCurrentUser: PropTypes.func,
}

export default withRouter(connect(mapState, mapDispatch)(Main))
