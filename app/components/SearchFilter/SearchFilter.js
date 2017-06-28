import React from 'react'
import PropTypes from 'prop-types'

const SearchFilter = (props) => {
  return (
    <div className="field">
      <p className="control">
        <input
          className="input"
          type="text"
          placeholder="Search ..."
          onChange={(({target}) => props.onChange(target.value))}
        />
      </p>
    </div>
  )
}

SearchFilter.propTypes = {
  onChange: PropTypes.func
}

export default SearchFilter
