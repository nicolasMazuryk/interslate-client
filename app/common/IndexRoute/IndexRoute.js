import React from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'
import Index from 'containers/Index/Index'

const IndexRoute = ({isLoggedIn, ...rest}) => {
  const render = (props) => {
    if (!isLoggedIn) {
      return <Index {...props} />
    }
    return <Redirect to={{pathname: '/translations', state: {from: props.location}}}/>
  }

  return (
    <Route {...rest} render={render}/>
  )
}

IndexRoute.propTypes = {
  isLoggedIn: PropTypes.bool,
  location: PropTypes.object
}

export default IndexRoute
