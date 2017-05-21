import React from 'react'
import PropTypes from 'prop-types'

const Input = (props) => {
  const {
    label,
    ...other
  } = props

  return (
    <div className="field">
      <label className="label">{label}</label>
      <p className="control">
        <input
          className="input"
          {...other}
        />
      </p>
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string
}

export default Input