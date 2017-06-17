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

    render() {
      const {isEditable, value} = this.state
      const {propMapper} = this.props
      const inputProps = omit(['propMapper', 'onSave'], this.props)
      return (
        <div onClick={() => this.setState({isEditable: true})}>
          {isEditable ?
            (
              <Input
                {...inputProps}
                focus={true}
                onBlur={this.onBlur}
                onChange={this.onChange}
                value={value}
              />
            )
            : <Component {...propMapper(this.props, this.state)} />
          }
        </div>
      )
    }
  }

  Editable.displayName = `Editable(${Component.displayName})`

  Editable.propTypes = {
    value: PropTypes.string,
    onSave: PropTypes.func,
    propMapper: PropTypes.func
  }

  return Editable
}