import React from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({component: Component, componentProps, ...rest}) => {
  const render = (props) => {
    if (componentProps.user) {
      return <Component {...componentProps} {...props} />
    }
    return <Redirect to={{pathname: '/enter', state: {from: props.location}}}/>
  }

  return (
    <Route {...rest} render={render}/>
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  componentProps: PropTypes.object
}

export default PrivateRoute
