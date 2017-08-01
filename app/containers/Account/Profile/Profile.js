import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Input from 'common/Input/Input'
import EditableEmail from './EditableEmail/EditableEmail'
import DeleteAccountModal from './DeleteAccountModal/DeleteAccountModal'

class Profile extends PureComponent {
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
    const field = target.getAttribute('name')
    this.setState({
      [field]: {
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
    const newPasswordValue = newPassword.value
    const confirmPasswordValue = confirmPassword.value
    if (!currentPassword.value) {
      return this.setState({currentPassword: {errorMessage: 'Enter current password'}})
    }
    if (!newPasswordValue || !confirmPasswordValue ||
      newPasswordValue !== confirmPasswordValue) {
      return this.setState({
        newPassword: {errorMessage: ' '},
        confirmPassword: {errorMessage: 'Passwords don\'t match'}
      })
    }
    changeUserPassword({
      currentPassword: confirmPasswordValue,
      newPassword: newPasswordValue
    })
  }

  render() {
    const {
      email,
      openDeleteAccountModal,
      closeDeleteAccountModal,
      deleteAccountModalOpened,
      updateUser,
      deleteUser
    } = this.props

    const {
      currentPassword,
      newPassword,
      confirmPassword
    } = this.state

    const placeholder = 'Edit ...'

    return (
				<div>

          <div className="field">
            <label className="label">Email:</label>
            <div className="control">
              <EditableEmail
                value={email}
                onSave={updateUser}
                mapEditablePropsToComponent={({value, ...other}) => {
                  return {email: value || placeholder, ...other}
                }}
              />
            </div>
          </div>

          <Input
            label='Current Password'
            type='password'
            name='currentPassword'
            value={currentPassword.value}
            onChange={this.onChangePassword}
            withError={currentPassword.errorMessage}
            helpText={currentPassword.errorMessage}
          />
          <Input
            label='New Password'
            type='password'
            name='newPassword'
            value={newPassword.value}
            onChange={this.onChangePassword}
            withError={newPassword.errorMessage}
            helpText={newPassword.errorMessage}
          />
          <Input
            label='Confirm New Password'
            type='password'
            name='confirmPassword'
            value={confirmPassword.value}
            onChange={this.onChangePassword}
            withError={confirmPassword.errorMessage}
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

					<div className="block is-pulled-right">
						<button
              className="button is-danger"
              onClick={openDeleteAccountModal}
						>
							Delete Account
						</button>
					</div>
					<DeleteAccountModal
						deleteUser={deleteUser}
						closeDeleteAccountModal={closeDeleteAccountModal}
						deleteAccountModalOpened={deleteAccountModalOpened}
					/>
				</div>
    )
  }
}

Profile.propTypes = {
  email: PropTypes.string,
  updateUser: PropTypes.func,
  deleteUser: PropTypes.func,
  openDeleteAccountModal: PropTypes.func,
  closeDeleteAccountModal: PropTypes.func,
  deleteAccountModalOpened: PropTypes.bool,
  changeUserPassword: PropTypes.func
}

export default Profile
