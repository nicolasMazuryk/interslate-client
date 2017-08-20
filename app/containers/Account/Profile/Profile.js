import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import EditableEmail from './EditableEmail/EditableEmail'
import ChangePasswordForm from './ChangePasswordFrom/ChangePasswordForm'
import DeleteAccountModal from './DeleteAccountModal/DeleteAccountModal'

class Profile extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      email,
      openDeleteAccountModal,
      closeDeleteAccountModal,
      deleteAccountModalOpened,
      changeUserPassword,
      updateUser,
      deleteUser
    } = this.props

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

          <ChangePasswordForm
            changeUserPassword={changeUserPassword}
          />

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
