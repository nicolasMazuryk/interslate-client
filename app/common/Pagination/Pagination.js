import React from 'react'
import PropTypes from 'prop-types'

const Pagination = (props) => {
  const {
    shownCount,
    totalCount,
    limitCountChange,
    loadItems
  } = props
  return (
    <div className="level">
      <div className="level-left">
        <div className="level-item">
          <p className="subtitle is-6">
            <strong>{shownCount}</strong> showed from <strong>{totalCount}</strong>
          </p>
        </div>
      </div>
      <div className="level-right">
        <div className="level-item">
          <p className="control">
          <span className="select">
            <select>
              <option>10</option>
              <option>50</option>
              <option>100</option>
              <option>All</option>
            </select>
          </span>
          </p>
        </div>
        <div className="level-item">
          <p className="control">
            <button
              onClick={loadItems}
              className="button"
            >
              Load more
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

Pagination.propTypes = {
  shownCount: PropTypes.number,
  totalCount: PropTypes.number,
  limitCountChange: PropTypes.func,
  loadItems: PropTypes.func.isRequired
}

export default Pagination
