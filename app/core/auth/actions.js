export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export const loginRequest = (credentials) => {
  return {
    type: LOGIN_REQUEST,
    payload: credentials
  }
}

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user
  }
}

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
    error: true
  }
}

export const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST
  }
}

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

export const logoutFailure = (error) => {
  return {
    type: LOGOUT_FAILURE,
    payload: error,
    error: true
  }
}
