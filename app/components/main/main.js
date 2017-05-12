import React, {PureComponent} from 'react'
import {Switch, Route} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import Translations from 'components/translations/translations'
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
      <main>
        
        <Switch>
          <Route exact path="/" component={Translations} />
        </Switch>
      </main>
    )
  }
  
}

Main.propTypes = {
  loaded: PropTypes.bool,
  loadApplication: PropTypes.func
}

export default Main