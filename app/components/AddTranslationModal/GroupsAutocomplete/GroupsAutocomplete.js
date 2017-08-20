import React from 'react'
import PropTypes from 'prop-types'
import Autocomplete from 'react-autocomplete'

const GroupAutocomplete = (props) => {
  const {
    groups,
    group,
    selectGroup,
    changeGroup
  } = props

  const inputProps = {
    className: 'input',
    placeholder: 'Your group ...'
  }

  return (
    <div className="field">
      <label className="label">
        Group
        <span
          style={{fontSize: '0.75rem'}}
          className="subtitle is-6"
        >
          {' '}(optional)
        </span>
      </label>
      <Autocomplete
        getItemValue={(item) => item}
        inputProps={inputProps}
        wrapperStyle={{}}
        renderItem={GroupAutocomplete.renderItem}
        renderMenu={GroupAutocomplete.renderMenu}
        shouldItemRender={GroupAutocomplete.shouldRender}
        items={groups}
        onSelect={selectGroup}
        value={group}
        onChange={changeGroup}
      />
      <div className="help">
        Type a new group {!!groups.length && 'or select from existing'}
      </div>
    </div>
  )
}

GroupAutocomplete.renderItem = function Item(item, isHighlighted) {
  return (
    <a key={item} className={`dropdown-item${isHighlighted ? ' is-active' : ''}`}>
      {item}
    </a>
  )
}

GroupAutocomplete.renderMenu = function Menu(items, value, style) {
  const display = {display: items.length ? 'block' : 'none'}
  return (
    <div
      style={{...display, ...style, ...this.menuStyle}}
      className="dropdown-menu"
      id="dropdown-menu"
      role="menu"
    >
      <div className="dropdown-content">{items}</div>
    </div>
  )
}

GroupAutocomplete.shouldRender = (item, value) => {
  return item.includes(value)
}

GroupAutocomplete.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.string),
  group: PropTypes.string,
  changeGroup: PropTypes.func,
  selectGroup: PropTypes.func
}

export default GroupAutocomplete
