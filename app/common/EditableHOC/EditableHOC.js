import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Input from 'common/Input/Input'
import omit from 'ramda/src/omit'

export default function editable(Component) {
  class Editable extends PureComponent {
    constructor(props) {
      super(props)

      this.state = {
        isEditable: false,
        value: props.value
      }

      this.onChange = this.onChange.bind(this)
      this.getEditableInput = this.getEditableInput.bind(this)
      this.onBlur = this.onBlur.bind(this)
    }

    onChange(e) {
      this.setState({
        value: e.target.value
      })
    }

    onBlur() {
      this.props.onSave(this.state.value)
      this.setState({
        isEditable: false
      })
    }

    getEditableInput() {
      const {value} = this.state
      const inputProps = omit(['propMapper', 'onSave', 'value'], this.props)
      return (
        <Input
          {...inputProps}
          focus={true}
          onBlur={this.onBlur}
          onChange={this.onChange}
          value={value}
        />
      )
    }

    render() {
      const {isEditable} = this.state
      const {propMapper} = this.props
      return (
        <div onClick={() => this.setState({isEditable: true})}>
          {isEditable
            ? this.getEditableInput()
            : <Component {...propMapper(this.props, this.state)} />
          }
        </div>
      )
    }
  }

  Editable.displayName = `Editable(${Component.displayName})`

  Editable.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onSave: PropTypes.func,
    propMapper: PropTypes.func
  }

  return Editable
}