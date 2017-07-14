import React from 'react'
import PropTypes from 'prop-types'

const Pagination = (props) => {
  const {
    shownCount,
    totalCount,
    limitCountChange,
    loadItems,
    loading
  } = props
  
  const onLimitCountChange = (event) => {
    const {value} = event.target
    limitCountChange(+value)
  }
  
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
            <select onChange={onLimitCountChange}>
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={0}>All</option>
            </select>
          </span>
          </p>
        </div>
        <div className="level-item">
          <p className="control">
            <button
              onClick={loadItems}
              disabled={shownCount === totalCount}
              className={`button ${loading && 'is-loading'}`}
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
  loading: PropTypes.bool,
  limitCountChange: PropTypes.func,
  loadItems: PropTypes.func.isRequired
}

export default Pagination
