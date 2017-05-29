import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import omit from 'ramda/src/omit'

class Input extends PureComponent {

  componentDidMount() {
    if (this.props.focus) {
      this.input.focus()
    }
  }

  render() {
    const {
      label,
      className,
    } = this.props

    const inputProps = omit(['label', 'className', 'focus'], this.props)

    return (
      <div className="field">
        <label className="label">{label}</label>
        <p className="control">
          <input
            ref={(input) => this.input = input}
            className={`input ${className}`}
            {...inputProps}
          />
        </p>
      </div>
    )
  }
}

Input.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  focus: PropTypes.bool
}

export default Input