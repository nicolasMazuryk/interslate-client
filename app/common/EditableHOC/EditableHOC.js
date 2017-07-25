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
      this.enableEditable= this.enableEditable.bind(this)
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

    enableEditable() {
      this.setState({isEditable: true})
    }

    getEditableInput() {
      const {value} = this.state
      const inputProps = omit([
        'mapEditablePropsToComponent',
        'onSave',
        'value'
      ], this.props)
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
      const {mapEditablePropsToComponent} = this.props
      const componentProps = mapEditablePropsToComponent(this.props, this.state)
      return (
        <div onClick={this.enableEditable}>
          {isEditable
            ? this.getEditableInput()
            : <Component {...componentProps} />
          }
        </div>
      )
    }
  }

  Editable.displayName = `Editable(${Component.displayName || 'Component'})`

  Editable.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    mapEditablePropsToComponent: PropTypes.func.isRequired
  }

  return Editable
}
