import React, {PureComponent} from 'react'
import LoginForm from 'components/LoginForm/LoginForm'
import RegisterForm from 'components/RegisterForm/RegisterForm'
import {connect} from 'react-redux'
import {loginRequest, registerRequest} from 'core/main/actions'
import PropTypes from 'prop-types'

const mapStateToProps = ({main}) => {
  return {
    user: main.user,
    loading: main.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => dispatch(loginRequest(credentials)),
    register: (credentials) => dispatch(registerRequest(credentials)),
  }
}

export class Auth extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      formType: 'login'
    }

    this.displayForm = this.displayForm.bind(this)
    this.changeFormType = this.changeFormType.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const {
      user,
      history,
      newUser,
      login
    } = nextProps

    if (newUser) {
      return login(newUser)
    }

    if (user) {
      return history.push('/')
    }
  }

  changeFormType(formType) {
    this.setState({formType})
  }

  displayForm() {
    const {
      login,
      register,
    } = this.props

    const {
      formType,
    } = this.state

    if (formType === 'login')
      return <LoginForm onSubmit={login} />

    if (formType === 'register') {
      return <RegisterForm onSubmit={register} />
    }
  }

  render() {
    const {
      formType,
    } = this.state

    const style = {
      marginTop: '20px',
      width: '400px'
    }
    return (
      <div className="container">
        <div className="level">
          <div className="level-item">
            <div className="box" style={style}>
              <div className="tabs is-centered">
                <ul>
                  <li
                    onClick={() => this.changeFormType('login')}
                    className={formType === 'login' && 'is-active'}
                  >
                    <a>Login</a>
                  </li>
                  <li
                    onClick={() => this.changeFormType('register')}
                    className={formType === 'register' && 'is-active'}>
                    <a>Register</a>
                  </li>
                </ul>
              </div>
              {this.displayForm()}
              <a href="http://127.0.0.1:9090/auth/google">Google</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Auth.propTypes = {
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  user: PropTypes.object,
  newUser: PropTypes.object,
  history: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
