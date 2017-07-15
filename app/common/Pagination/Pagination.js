import React from 'react'
import PropTypes from 'prop-types'
import Select from 'common/Select/Select'

const Pagination = (props) => {
  const {
    shownCount,
    totalCount,
    limitCountChange,
    limitSelectOptions,
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
          <p className="subtitle is-6 pagination-count-state">
            <strong>{shownCount}</strong> showed from <strong>{totalCount}</strong>
          </p>
        </div>
      </div>
      <div className="level-right">
        <div className="level-item">
          <p className="control">
            <Select
              options={limitSelectOptions}
              onChange={onLimitCountChange}
            />
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
  limitSelectOptions: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
    value: PropTypes.string
  })),
  loadItems: PropTypes.func.isRequired
}

Pagination.defaultProps = {
  limitSelectOptions: [
    {key: 10, value: '10'},
    {key: 50, value: '50'},
    {key: 100, value: '100'},
    {key: 0, value: 'All'},
  ]
}

export default Pagination
