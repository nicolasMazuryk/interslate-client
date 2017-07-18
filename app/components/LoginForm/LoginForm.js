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
      validation: {
        email: ''
      }
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)
  }

  onChange(e) {
    e.preventDefault()
    const target = e.target
    const value = target.value
    const field = target.getAttribute('name')

    this.setState({
      [field]: value,
      validation: {
        ...this.state.validation,
        [field]: ''
      }
    })
  }
  
  validate() {
    const {
      email,
    } = this.state
    const result = {}
    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    
    if (!emailPattern.test(email)) {
      result.email = 'Invalid email pattern. Example: mymail@gmail.com.'
    }
    
    const isValid = Object.keys(result).length === 0
    
    return [isValid, result]
  }

  onSubmit(e) {
    e.preventDefault()
    const [isValid, validationResult] = this.validate()
    
    const {validation} = this.state
  
    if (!isValid) {
      return this.setState({
        validation: {...validation, ...validationResult}
      })
    }
    this.props.onSubmit(this.state)
  }

  render() {
    const {
      email,
      password,
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
          value={password}
          onChange={this.onChange}
        />
        <AuthButton
          text="Login"
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
