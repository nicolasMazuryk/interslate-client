import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from './actions'
import {createReducer} from 'core/utils'

const DEFAULT_STATE = {
  loading: false,
  newUser: null,
  user: null,
  error: null,
}

const setLoading = (state) => {
  return {
    ...state,
    loading: true
  }
}

const setNewUser = (state, action) => {
  return {
    ...state,
    loading: false,
    newUser: action.payload
  }
}

const setUser = (state, action) => {
  return {
    ...state,
    user: action.payload,
    error: null,
    newUser: false,
    loading: false
  }
}

const removeUser = (state) => {
  return {
    ...state,
    user: null,
    error: null,
    loading: false
  }
}

const setError = (state, action) => {
  return {
    ...state,
    error: action.payload,
    loading: false
  }
}

export default createReducer(DEFAULT_STATE, {

  [LOGIN_REQUEST]: setLoading,
  [LOGIN_SUCCESS]: setUser,
  [LOGIN_FAILURE]: setError,

  [LOGOUT_REQUEST]: setLoading,
  [LOGOUT_SUCCESS]: removeUser,
  [LOGOUT_FAILURE]: setError,

  [REGISTER_REQUEST]: setLoading,
  [REGISTER_SUCCESS]: setNewUser,
  [REGISTER_FAILURE]: setError

})
