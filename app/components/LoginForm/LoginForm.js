import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Input from 'common/Input/Input'
import LoginButton from './LoginButton/LoginButton'

class LoginForm extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    e.preventDefault()
    const target = e.target
    const value = target.value
    const field = target.getAttribute('name')

    this.setState({
      [field]: value
    })
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render() {
    const {
      email,
      password
    } = this.state

    return (
      <form>
        <Input
          required
          label="Email"
          name="email"
          type="email"
          focus={true}
          value={email}
          onChange={this.onChange}
        />
        <Input
          required
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={this.onChange}
        />
        <LoginButton onClick={this.onSubmit} />
      </form>
    )
  }

}

LoginForm.propTypes = {
  onSubmit: PropTypes.func
}

export default LoginForm
