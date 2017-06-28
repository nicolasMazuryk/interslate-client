import React from 'react'
import editable from 'common/EditableHOC/EditableHOC'
import PropTypes from 'prop-types'

export const Key = ({tKey}) => <span>{tKey}</span>

Key.propTypes = {
  tKey: PropTypes.string
}

export default editable(Key)