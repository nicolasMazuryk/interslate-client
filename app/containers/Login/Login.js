import React, {PureComponent} from 'react'
import LoginForm from 'components/LoginForm/LoginForm'
import {connect} from 'react-redux'
import {loginRequest} from 'core/main/actions'
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
  }
}

export class Login extends PureComponent {

  componentWillReceiveProps(nextProps) {
    const {
      user,
      history
    } = nextProps

    if (user) {
      history.push('/')
    }
  }

  render() {
    const {
      login
    } = this.props

    const style = {
      marginTop: '20px',
      width: '400px'
    }
    return (
      <div className="container">
        <div className="level">
          <div className="level-item">
            <div className="box" style={style}>
              <LoginForm onSubmit={login} />
              <a href="http://127.0.0.1:9090/auth/google">Google</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  user: PropTypes.object,
  history: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)