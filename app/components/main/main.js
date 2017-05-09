import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loadApplication} from './actions'
import Header from 'components/header/header'

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
      <Header />
    )
  }
  
}

Main.propTypes = {
  loaded: PropTypes.bool,
  loadApplication: PropTypes.func
}

export default Main