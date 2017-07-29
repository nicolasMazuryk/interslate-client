import React from 'react'
import PropTypes from 'prop-types'

const FormDivider = ({text}) => {
  return (
    <div className="level">
      <div className="level-item">
        ---- {text} ----
      </div>
    </div>
  )
}

FormDivider.propTypes = {
  text: PropTypes.string
}

export default FormDivider
