import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const AsideMenu = ({items, activeLink}) => {
  const createSubItems = (subItems, activeLink) => {
    return subItems.map(({title, url}) => {
      return (
        <li key={title}>
          <Link
            className={`${url === activeLink  ? 'is-active' : ''}`}
            to={url}
          >
            {title}
          </Link>
        </li>
      )
    })
  }

  const createItems = (items) => {
    return items.map(({header, subItems}, i) => {
      return [
        <p key={header} className="menu-label">
          {header}
        </p>,
        <ul className="menu-list" key={i}>
          {createSubItems(subItems, activeLink)}
        </ul>
      ]
    })
  }

  return (
    <aside className="menu">
      {createItems(items)}
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
  activeLink: PropTypes.string
}

export default AsideMenu
