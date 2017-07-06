import React from 'react'
import PropTypes from 'prop-types'

const AsideMenu = ({items, activeItem}) => {

  const createSubItems = (subItems, activeItem) => {
    return subItems.map(({title, onClick}) => {
      const isActive = title.split(' ').join('-').toLowerCase() === activeItem
      return (
        <li key={title}>
          <a
            className={`${isActive ? 'is-active' : ''}`}
            onClick={onClick}
          >
            {title}
          </a>
        </li>
      )
    })
  }

  const createItems = (items, activeItem) => {
    return items.map(({header, subItems}, i) => {
      return [
        <p key={header} className="menu-label">
          {header}
        </p>,
        <ul className="menu-list" key={i}>
          {createSubItems(subItems, activeItem)}
        </ul>
      ]
    })
  }

  return (
    <aside className="menu">
      {createItems(items, activeItem)}
    </aside>
  )
}

const subItemsShape = PropTypes.shape({
  title: PropTypes.string,
  onClick: PropTypes.func
})

const itemShape = PropTypes.shape({
  header: PropTypes.string,
  subItems: PropTypes.arrayOf(subItemsShape)
})

AsideMenu.propTypes = {
  items: PropTypes.arrayOf(itemShape),
  activeItem: PropTypes.string
}

export default AsideMenu
