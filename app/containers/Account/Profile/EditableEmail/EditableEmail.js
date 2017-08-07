import React from 'react'
import editable from 'common/EditableHOC/EditableHOC'
import PropTypes from 'prop-types'

export const EditableEmail = ({email}) => <span>{email}</span>

EditableEmail.propTypes = {
  email: PropTypes.string
}

export default editable(EditableEmail)
