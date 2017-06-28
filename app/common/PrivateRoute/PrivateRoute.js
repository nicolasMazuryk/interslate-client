import React from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const render = (props) => {
    if (user) {
      return <Component user={user} {...props} />
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
  user: PropTypes.object
}

export default PrivateRoute