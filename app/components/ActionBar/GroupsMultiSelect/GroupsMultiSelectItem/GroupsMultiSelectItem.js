import React from 'react'
import PropTypes from 'prop-types'

const GroupsMultiSelectItem = (props) => {
  const {
    isSelected,
    onItemClick,
    item
  } = props

  const noop = () => {}

  return (
    <a
      className='dropdown-item groups-multi-select-item groups-multi-select'
      onClick={(e) => onItemClick(e, item)}
    >
      <input
        className="groups-multi-select-item groups-multi-select"
        checked={isSelected}
        type="checkbox"
        onChange={noop}
      />
      <label className="checkbox groups-multi-select-item groups-multi-select">
        {item}
      </label>
    </a>
  )
}

GroupsMultiSelectItem.propTypes = {
  isSelected: PropTypes.bool,
  item: PropTypes.string,
  onItemClick: PropTypes.func
}

export default GroupsMultiSelectItem
