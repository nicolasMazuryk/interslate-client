import React, {PureComponent} from 'react'
import LoginForm from 'components/LoginForm/LoginForm'
import RegisterForm from 'components/RegisterForm/RegisterForm'
import RecoverForm from 'components/RecoverForm/RecoverForm'
import FormDivider from 'containers/Auth/FormDivider/FormDivider'
import LoginWithServices from 'containers/Auth/LoginWithServices/LoginWithServices'
import FormSwitcher from 'containers/Auth/FormSwitcher/FormSwitcher'
import {connect} from 'react-redux'
import {loginRequest, registerRequest, recoverRequest} from 'core/main/actions'
import PropTypes from 'prop-types'
import Loader from 'common/Loader/Loader'
import {Route} from 'react-router-dom'

const style = {
  marginTop: '20px',
  width: '400px',
}

const mapStateToProps = (state) => {
  const {main} = state
  return {
    user: main.user,
    loading: main.loading,
    newUser: main.newUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => dispatch(loginRequest(credentials)),
    register: (credentials) => dispatch(registerRequest(credentials)),
    recover: (email) => dispatch(recoverRequest(email))
  }
}

export function componentWillReceiveProps(nextProps) {
  const {
    user,
    history,
    newUser,
    login,
    location: {pathname}
  } = nextProps

  if (pathname === '/enter') {
    return history.push('/enter/login')
  }

  if (newUser) {
    return login(newUser)
  }

  if (user) {
    return history.push('/translations')
  }
}

export function getTitle(pathname) {
  if (pathname === '/enter/login')
    return 'Login'
  if (pathname === '/enter/register')
    return 'Register'
  if (pathname === '/enter/recover')
    return 'Recover'
}

export function componentWillMount() {
  const {
    location: {pathname},
    history
  } = this.props

  if (pathname === '/enter') {
    return history.push('/enter/login')
  }
}

export class Auth extends PureComponent {

  constructor(props) {
    super(props)

    this.componentWillMount = componentWillMount.bind(this)
    this.componentWillReceiveProps = componentWillReceiveProps.bind(this)
    this.getTitle = getTitle.bind(this)
  }

  render() {
    const {
      location: {pathname},
      login,
      register,
      recover
    } = this.props

    return (
      <div className="container is-fluid">
        <Loader style={{
          marginTop: '2rem',
          display: this.props.loading ? 'block' : 'none'
        }}/>
        <div style={{display: this.props.loading ? 'none' : 'block'}} className="level auth-form">
          <div className="level-item">
            <div className="box" style={style}>
              <h1 className="title">
                {this.getTitle(pathname)}
              </h1>
              <hr/>
              <div className="level">
                <div className="level-item">
                  <Route path="/enter/login" render={() => <LoginForm onSubmit={login} />} />
                  <Route path="/enter/register" render={() => <RegisterForm onSubmit={register} />} />
                  <Route path="/enter/recover" render={() => <RecoverForm onSubmit={recover} />} />
                </div>
              </div>
              <div style={{display: pathname !== '/enter/recover' ? 'block' : 'none'}}>
                <FormDivider text="or" />
                <LoginWithServices />
              </div>
              <p
                style={{display: pathname !== '/enter/recover' ? 'none' : 'block'}}
                className="content has-text-centered"
              >
                Type your email and we will send you new password.
              </p>
            </div>
          </div>
        </div>
        <FormSwitcher pathname={pathname}/>
      </div>
    )
  }
}

Auth.propTypes = {
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  recover: PropTypes.func.isRequired,
  user: PropTypes.object,
  newUser: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  loading: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
