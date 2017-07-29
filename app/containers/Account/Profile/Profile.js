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

    this.onSaveEmail = this.onSaveEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onSubmitPassword = this.onSubmitPassword.bind(this)
  }

  onSaveEmail(email) {
    const {user, updateUser} = this.props
    const newUser = {...user, email}
    updateUser(newUser)
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
    if (!currentPassword.value) {
      return this.setState({currentPassword: {errorMessage: 'Enter current password'}})
    }
    if (!newPassword.value || !confirmPassword.value ||
      newPassword.value !== confirmPassword.value) {
      return this.setState({
        newPassword: {errorMessage: ' '},
        confirmPassword: {errorMessage: 'Passwords doesn\'t match'}
      })
    }
    changeUserPassword({
      currentPassword: currentPassword.value,
      newPassword: newPassword.value
    })
  }

  render() {
    const {
      user,
      openDeleteAccountModal,
      closeDeleteAccountModal,
      deleteAccountModalOpened,
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
                value={user.email}
                onSave={(email) => this.onSaveEmail(email)}
                mapEditablePropsToComponent={({value, ...other}) => {
                  return {email: value || placeholder, ...other}
                }}
              />
            </div>
          </div>

          <Input
            label={'Current Password'}
            type={'password'}
            name={'currentPassword'}
            value={currentPassword.value}
            onChange={this.onChangePassword}
            helpText={currentPassword.errorMessage}
          />
          <Input
            label={'New Password'}
            type={'password'}
            name={'newPassword'}
            value={newPassword.value}
            onChange={this.onChangePassword}
            helpText={newPassword.errorMessage}
          />
          <Input
            label={'Confirm New Password'}
            type={'password'}
            name={'confirmPassword'}
            value={confirmPassword.value}
            onChange={this.onChangePassword}
            helpText={confirmPassword.errorMessage}
          />

          <div className="block is-pulled-left">
            <a className="button is-success"
               onClick={this.onSubmitPassword}
            >
              Change password
            </a>
          </div>

					<div className="block is-pulled-right">
						<a className="button is-danger"
               onClick={openDeleteAccountModal}
						>
							Delete Account
						</a>
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
  user: PropTypes.object,
  updateUser: PropTypes.func,
  deleteUser: PropTypes.func,
  openDeleteAccountModal: PropTypes.func,
  closeDeleteAccountModal: PropTypes.func,
  deleteAccountModalOpened: PropTypes.bool,
  changeUserPassword: PropTypes.func
}

export default Profile
