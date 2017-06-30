import React from 'react'
import PropTypes from 'prop-types'

export const renderOptions = (options) => {
  return options.map(({key, value}) => (
    <option key={key} value={key}>{value}</option>
  ))
}

const Select = (props) => {
  const {
    options,
    onChange,
    ...other
  } = props

  return (
    <span className="select">
      <select onChange={onChange} {...other}>
        {options.length > 0
          ? renderOptions(options)
          : <option>Loading...</option>
        }
      </select>
    </span>
  )
}

Select.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  label: PropTypes.string
}

export default Select
