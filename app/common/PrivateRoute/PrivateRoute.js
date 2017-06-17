import React from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  const render = (props) => {
    if(isLoggedIn) {
      return <Component {...props} />
    }
    return <Redirect to={{pathname: '/enter', state: { from: props.location }}}/>
  }
  return (
    <Route {...rest} render={render}/>
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  isLoggedIn: PropTypes.bool
}

export default PrivateRoute