import React from 'react'
import PropTypes from 'prop-types'

const Select = (props) => {
  const {
    options,
    recentOptions,
    onChange,
    divider,
    ...other
  } = props

  const hasRecent = recentOptions.length > 0
  const hasOptions = options.length > 0

  return (
    <span className={`select${!hasOptions ? ' is-loading' : ''}`}>
      <select onChange={onChange} {...other}>
        {hasRecent && Select.renderOptions(recentOptions)}
        {hasRecent && <option className="divider" disabled>{divider}</option>}
        {hasOptions && Select.renderOptions(options)}
      </select>
    </span>
  )
}

Select.renderOptions = (options) => {
  return options.map(({key, value}) => (
    <option key={key} value={key}>{value}</option>
  ))
}

Select.propTypes = {
  options: PropTypes.array,
  recentOptions: PropTypes.array,
  onChange: PropTypes.func,
  divider: PropTypes.string,
  label: PropTypes.string
}

Select.defaultProps = {
  options: [],
  recentOptions: [],
  divider: '--------------'
}

export default Select
