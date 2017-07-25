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
import {
  logoutRequest,
  getCurrentUserRequest,
  updateUserRequest,
  deleteUserRequest,
  openDeleteAccountModal,
  closeDeleteAccountModal,
  generateUploadTokenRequest,
  changePasswordRequest
} from 'core/main/actions'

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logoutRequest()),
    getCurrentUser: () => dispatch(getCurrentUserRequest()),
    updateUser: (user) => dispatch(updateUserRequest(user)),
    deleteUser: () => dispatch(deleteUserRequest()),
    openDeleteAccountModal: () => dispatch(openDeleteAccountModal()),
    closeDeleteAccountModal: () => dispatch(closeDeleteAccountModal()),
    generateUploadToken: () => dispatch(generateUploadTokenRequest()),
    changeUserPassword: (password) => dispatch(changePasswordRequest(password))
  }
}

const mapState = ({main}) => {
  return {
    loading: main.loading,
    user: main.user,
    uploadTokenIsGenerating: main.uploadTokenIsGenerating,
    deleteAccountModalOpened: main.deleteAccountModalOpened
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
      updateUser,
      deleteUser,
      generateUploadToken,
      uploadTokenIsGenerating,
      openDeleteAccountModal,
      closeDeleteAccountModal,
      deleteAccountModalOpened,
      changeUserPassword
    } = this.props

    return (
      <main>
        <Header isLoggedIn={!!user} logout={logout} />
          <Switch>
            <Route path="/enter" component={Auth} />
            <Private
              exact
              path="/translations"
              componentProps={{user}}
              component={Translations}
            />
            <Private
              path="/account"
              componentProps={{
                user,
                updateUser,
                deleteUser,
                generateUploadToken,
                uploadTokenIsGenerating,
                openDeleteAccountModal,
                closeDeleteAccountModal,
                deleteAccountModalOpened,
                changeUserPassword
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
  updateUser: PropTypes.func,
  generateUploadToken: PropTypes.func,
  deleteUser: PropTypes.func,
  openDeleteAccountModal: PropTypes.func,
  closeDeleteAccountModal: PropTypes.func,
  deleteAccountModalOpened: PropTypes.bool,
  changeUserPassword: PropTypes.func

}

export default withRouter(connect(mapState, mapDispatch)(Main))
