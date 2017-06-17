import React from 'react'
import editable from 'common/EditableHOC/EditableHOC'
import PropTypes from 'prop-types'

export const Translation = ({translation}) => <span>{translation}</span>

Translation.propTypes = {
  translation: PropTypes.string
}

export default editable(Translation)