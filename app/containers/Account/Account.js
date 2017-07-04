import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

const mapState = () => {
  return {}
}

const mapDispatch = () => {
  return {}
}

export class Account extends PureComponent {

  render() {
    return (
      <div>
        Not implemented yet
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(Account)
