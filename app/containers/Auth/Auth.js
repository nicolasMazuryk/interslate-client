import React, {PureComponent} from 'react'
import LoginForm from 'components/LoginForm/LoginForm'
import RegisterForm from 'components/RegisterForm/RegisterForm'
import FormDivider from 'containers/Auth/FormDivider/FormDivider'
import LoginWithServices from 'containers/Auth/LoginWithServices/LoginWithServices'
import FormSwitcher from 'containers/Auth/FormSwitcher/FormSwitcher'
import {connect} from 'react-redux'
import {loginRequest, registerRequest} from 'core/main/actions'
import PropTypes from 'prop-types'

const style = {
  marginTop: '20px',
  width: '400px'
}

const mapStateToProps = (state) => {
  const {main} = state
  return {
    user: main.user,
    loading: main.loading,
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
      return history.push('/translations')
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

    return (
      <div className="container is-fluid">
        <div className="level">
          <div className="level-item">
            <div className="box" style={style}>
              <h1 className="title">
                {formType === 'register' ? 'Register' : 'Login'}
              </h1>
              <hr/>
              <div className="level">
                <div className="level-item">
                  {this.displayForm()}
                </div>
              </div>
              <FormDivider text="or" />
              <LoginWithServices />
            </div>
          </div>
        </div>
        <FormSwitcher
          changeType={this.changeFormType}
          type={formType}
        />
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
