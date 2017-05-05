import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loadApplication} from './actions'

const mapState = (state) => {
  return {
    loaded: state.main.loaded
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadApplication: () => dispatch(loadApplication())
  }
}

@connect(mapState, mapDispatch)
class Main extends PureComponent {
  
  componentDidMount() {
    this.props.loadApplication()
  }
  
  render() {
    return (
      <div>{this.props.loaded}</div>
    )
  }
  
}

Main.propTypes = {
  loaded: PropTypes.bool,
  loadApplication: PropTypes.func
}

export default Main