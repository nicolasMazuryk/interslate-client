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
      helpText,
      withError
    } = this.props

    const inputProps = omit([
      'label',
      'className',
      'focus',
      'withError',
      'helpText'
    ], this.props)

    return (
      <div className="field">
        <label className="label">{label}</label>
        <div className="control">
          <input
            ref={(input) => this.input = input}
            className={`input${className ? ' ' + className : ''}${withError ? ' is-danger' : ''}`}
            {...inputProps}
          />
          <p className={`help${withError ? ' is-danger' : ''}`}>{helpText}</p>
        </div>
      </div>
    )
  }
}

Input.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  helpText: PropTypes.string,
  focus: PropTypes.bool,
  withError: PropTypes.bool,
}

Input.defaultProps = {
  withError: false
}

export default Input
