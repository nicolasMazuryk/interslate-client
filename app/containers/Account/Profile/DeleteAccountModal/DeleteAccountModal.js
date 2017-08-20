import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Modal from 'common/Modal/Modal'

class DeleteAccountModal extends PureComponent {
  render() {
    const {
      closeDeleteAccountModal,
      deleteAccountModalOpened,
      deleteUser
    } = this.props

    return (
      <Modal
        title='Delete Account'
        opened={deleteAccountModalOpened}
        onSubmit={deleteUser}
        onClose={closeDeleteAccountModal}
        submitName='Confirm'
      >
        <div>
          Do you really want to delete your account?
        </div>
      </Modal>
    )
  }
}

DeleteAccountModal.propTypes = {
  deleteUser: PropTypes.func,
  closeDeleteAccountModal: PropTypes.func,
  deleteAccountModalOpened: PropTypes.bool,
}

export default DeleteAccountModal
