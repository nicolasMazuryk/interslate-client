import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Input from 'common/Input/Input'

class ChangePasswordForm extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      currentPassword: {errorMessage: '', value: ''},
      newPassword: {errorMessage: '', value: ''},
      confirmPassword: {errorMessage: '', value: ''},
    }

    this.onChangePassword = this.onChangePassword.bind(this)
    this.onSubmitPassword = this.onSubmitPassword.bind(this)
  }

  onChangePassword(e) {
    const target = e.target
    const {value} = target
    const name = target.name
    this.setState({
      [name]: {
        value,
        errorMessage: ''
      }
    })
  }

  onSubmitPassword() {
    const {changeUserPassword} = this.props
    const {
      currentPassword,
      newPassword,
      confirmPassword
    } = this.state
    const currentPasswordValue = currentPassword.value
    const newPasswordValue = newPassword.value
    const confirmPasswordValue = confirmPassword.value
    if (!currentPasswordValue) {
      return this.setState({currentPassword: {
        errorMessage: 'Enter current password',
        value: currentPasswordValue
      }})
    }
    if (!newPasswordValue || !confirmPasswordValue ||
      newPasswordValue !== confirmPasswordValue) {
      return this.setState({
        newPassword: {errorMessage: ' ', value: newPasswordValue},
        confirmPassword: {errorMessage: 'Passwords don\'t match', value: confirmPasswordValue}
      })
    }
    changeUserPassword({
      currentPassword: currentPasswordValue,
      newPassword: newPasswordValue
    })
  }

  render() {
    const {
      currentPassword,
      newPassword,
      confirmPassword
    } = this.state

    return (
      <div>
        <Input
          label='Current Password'
          type='password'
          name='currentPassword'
          value={currentPassword.value}
          onChange={this.onChangePassword}
          withError={!!currentPassword.errorMessage}
          helpText={currentPassword.errorMessage}
        />
        <Input
          label='New Password'
          type='password'
          name='newPassword'
          value={newPassword.value}
          onChange={this.onChangePassword}
          withError={!!newPassword.errorMessage}
          helpText={newPassword.errorMessage}
        />
        <Input
          label='Confirm New Password'
          type='password'
          name='confirmPassword'
          value={confirmPassword.value}
          onChange={this.onChangePassword}
          withError={!!confirmPassword.errorMessage}
          helpText={confirmPassword.errorMessage}
        />

        <div className="block is-pulled-left">
          <button
            name="changePassword"
            className="button is-success"
            onClick={this.onSubmitPassword}
          >
            Change password
          </button>
        </div>
      </div>
    )
  }
}

ChangePasswordForm.propTypes = {
  changeUserPassword: PropTypes.func
}

export default ChangePasswordForm
