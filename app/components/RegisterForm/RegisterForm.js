import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Input from 'common/Input/Input'
import AuthButton from 'common/AuthButton/AuthButton'

class LoginForm extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      validation: {
        email: '',
        password: '',
        confirmPassword: ''
      }
    }

    this.onChange = this.onChange.bind(this)
    this.validate = this.validate.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    e.preventDefault()
    const target = e.target
    const value = target.value
    const field = target.getAttribute('name')

    this.setState({
      [field]: value.trim(),
      validation: {
        ...this.state.validation,
        [field]: ''
      }
    })
  }

  validate() {
    const {
      email,
      password,
      confirmPassword,
    } = this.state
    const result = {}
    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

    if (!emailPattern.test(email)) {
      result.email = 'Invalid email pattern. Example: mymail@gmail.com.'
    }
    if (password.length < 2) {
      result.password = 'Invalid password. Minimum 2 symbols.'
    }
    if (confirmPassword !== password) {
      result.confirmPassword = 'Invalid password confirmation. Passwords don\'t match.'
    }

    const isValid = Object.keys(result).length === 0

    return [isValid, result]
  }

  onSubmit(e) {
    e.preventDefault()

    const {
      validation,
      email,
      password,
    } = this.state

    const [isValid, validationResult] = this.validate()

    if (!isValid) {
      return this.setState({
        validation: {...validation, ...validationResult}
      })
    }
    return this.props.onSubmit({email, password})
  }

  render() {
    const {
      email,
      password,
      confirmPassword,
      validation
    } = this.state

    return (
      <form style={{width: '100%'}}>
        <Input
          required
          label="Email"
          name="email"
          type="email"
          helpText={validation.email}
          focus={true}
          value={email}
          onChange={this.onChange}
        />
        <Input
          required
          label="Password"
          name="password"
          type="password"
          helpText={validation.password}
          value={password}
          onChange={this.onChange}
        />
        <Input
          required
          label="Confirm password"
          name="confirmPassword"
          type="password"
          helpText={validation.confirmPassword}
          value={confirmPassword}
          onChange={this.onChange}
        />
        <AuthButton
          text="Continue"
          onClick={this.onSubmit}
        />
      </form>
    )
  }

}

LoginForm.propTypes = {
  onSubmit: PropTypes.func
}

export default LoginForm
