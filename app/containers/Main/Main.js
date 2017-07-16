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
  generateUploadTokenRequest
} from 'core/main/actions'

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logoutRequest()),
    getCurrentUser: () => dispatch(getCurrentUserRequest()),
    generateUploadToken: () => dispatch(generateUploadTokenRequest())
  }
}

const mapState = ({main}) => {
  return {
    loading: main.loading,
    user: main.user,
    uploadTokenIsGenerating: main.uploadTokenIsGenerating
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
      generateUploadToken,
      uploadTokenIsGenerating
    } = this.props
    const isLoggedIn = !!user

    return (
      <main>
        <Header isLoggedIn={isLoggedIn} logout={logout} />
          <Switch>
            <Route path="/enter" component={Auth} />
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
                generateUploadToken,
                uploadTokenIsGenerating,
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
  user: PropTypes.object,
  loading: PropTypes.bool,
  uploadTokenIsGenerating: PropTypes.bool,
  getCurrentUser: PropTypes.func,
  generateUploadToken: PropTypes.func
}

export default withRouter(connect(mapState, mapDispatch)(Main))
