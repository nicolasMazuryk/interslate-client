import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import GroupsMultiSelectItem from './GroupsMultiSelectItem/GroupsMultiSelectItem'

export default class GroupsMultiSelect extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      value: [],
      isOpened: false
    }

    this.toggleMenu = this.toggleMenu.bind(this)
    this.onItemClick = this.onItemClick.bind(this)
    this.renderItems = this.renderItems.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.getTitle = this.getTitle.bind(this)
  }

  componentDidMount() {
    window.addEventListener('click', this.closeMenu)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeMenu)
  }

  closeMenu(e) {
    const {classList} = e.target
    const isMultiSelectElement = classList.contains('groups-multi-select')

    if (!isMultiSelectElement) {
      this.setState({isOpened: false})
    }
  }

  getTitle() {
    const {
      selectedGroups
    } = this.props

    if (selectedGroups.length === 0) {
      return 'Select groups'
    }

    const groupsToDisplay = selectedGroups.join(', ')
    const charLimit = 15

    if (groupsToDisplay.length < charLimit) {
      return groupsToDisplay
    }

    if (groupsToDisplay) {
      return `${groupsToDisplay.substring(0, charLimit)} ...`
    }
  }

  toggleMenu() {
    this.setState(({isOpened}) => ({
      isOpened: !isOpened
    }))
  }

  renderItems() {
    const {
      groups,
      selectedGroups
    } = this.props

    return groups.map(group => {
      const isSelected = selectedGroups.findIndex((item) => item === group) >= 0
      return (
        <GroupsMultiSelectItem
          key={group}
          item={group}
          onItemClick={this.onItemClick}
          isSelected={isSelected}
        />
      )
    })
  }

  onItemClick(e, group) {
    const {
      onSelect,
      onDeselect,
      selectedGroups
    } = this.props
    const {classList} = e.currentTarget
    const isItemElementClicked = classList.contains('groups-multi-select-item')

    if (isItemElementClicked) {
      const index = selectedGroups.findIndex((item) => item === group)

      if (index !== -1) {
        return onDeselect(group)
      }

      onSelect(group)
    }
  }

  render() {
    const {isOpened} = this.state
    const title = this.getTitle()

    return (
      <div className={`dropdown${isOpened ? ' is-active' : ''}`}>
        <div className="dropdown-trigger">
          <button
            style={{width: '12rem'}}
            className="button groups-multi-select"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={this.toggleMenu}
          >
            <span className="groups-multi-select">{title}</span>
          </button>
        </div>
        <div className="dropdown-menu groups-multi-select" id="dropdown-menu" role="menu">
          <div className="dropdown-content groups-multi-select">
            {this.renderItems()}
          </div>
        </div>
      </div>
    )
  }
}

GroupsMultiSelect.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.string),
  selectedGroups: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func,
  onDeselect: PropTypes.func
}
