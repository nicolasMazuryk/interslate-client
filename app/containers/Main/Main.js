import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Switch, Route} from 'react-router-dom'
import Translations from 'containers/Translations/Translations'
import Account from 'containers/Account/Account'
import Auth from 'containers/Auth/Auth'
import Header from 'components/Header/Header'
import PrivateRoute from 'common/PrivateRoute/PrivateRoute'
import IndexRoute from 'common/IndexRoute/IndexRoute'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  logoutRequest,
  getCurrentUserRequest,
  updateUserRequest,
  deleteUserRequest,
} from 'core/main/actions'

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logoutRequest()),
    getCurrentUser: () => dispatch(getCurrentUserRequest()),
    updateUser: (user) => dispatch(updateUserRequest(user)),
    deleteUser: () => dispatch(deleteUserRequest()),
  }
}

const mapState = ({main}) => {
  return {
    loading: main.loading,
    user: main.user,
  }
}

export class Main extends PureComponent {
  
  componentDidMount() {
    this.props.getCurrentUser()
  }

  render() {
    const {
      logout,
      loading,
      user,
      updateUser,
      deleteUser,
    } = this.props
    const isLoggedIn = !!user

    return (
      <main>
        <Header isLoggedIn={isLoggedIn} logout={logout} />
          <Switch>
            <Route loading={loading} path="/enter" component={Auth} />
            <IndexRoute exact path="/" isLoggedIn={isLoggedIn}/>
            <PrivateRoute
              exact
              path="/translations"
              componentProps={{user}}
              component={Translations}
            />
            <PrivateRoute
              path="/account"
              componentProps={{
                user,
                updateUser,
                deleteUser,
              }}
              component={Account}
            />
          </Switch>
      </main>
    )
  }
  
}

Main.propTypes = {
  logout: PropTypes.func,
  loading: PropTypes.bool,
  user: PropTypes.object,
  getCurrentUser: PropTypes.func,
  updateUser: PropTypes.func,
  deleteUser: PropTypes.func,
}

export default withRouter(connect(mapState, mapDispatch)(Main))
