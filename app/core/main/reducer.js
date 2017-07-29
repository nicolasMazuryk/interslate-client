import {createReducer} from 'core/utils'
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
  GET_CURRENT_USER_REQUEST,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from './actions'

import {
  GENERATE_UPLOAD_TOKEN_REQUEST,
  GENERATE_UPLOAD_TOKEN_SUCCESS,
  GENERATE_UPLOAD_TOKEN_FAILURE,
} from 'core/account/actions'

const DEFAULT_STATE = {
  loading: false,
  user: null,
  newUser: null,
  error: null,
  uploadTokenIsGenerating: false,
}

const setLoading = (state) => {
  return {
    ...state,
    loading: true
  }
}

const setUser = (state, action) => {
  return {
    ...state,
    user: action.payload,
    newUser: null,
    error: null,
    loading: false
  }
}

const setNewUser = (state, action) => {
  return {
    ...state,
    loading: false,
    newUser: action.payload,
    user: null
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

const setUploadTokenGenerating = (state) => {
  return {
    ...state,
    uploadTokenIsGenerating: true
  }
}

const setUploadToken = (state, action) => {
  return {
    ...state,
    uploadTokenIsGenerating: false,
    user: {
      ...(state.user || {}),
      uploadToken: action.payload
    }
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
  [REGISTER_FAILURE]: setError,
  
  [GET_CURRENT_USER_REQUEST]: setLoading,
  [GET_CURRENT_USER_SUCCESS]: setUser,
  [GET_CURRENT_USER_FAILURE]: setError,

  [UPDATE_USER_REQUEST]: setLoading,
  [UPDATE_USER_SUCCESS]: setUser,
  [UPDATE_USER_FAILURE]: setError,

  [DELETE_USER_REQUEST]: setLoading,
  [DELETE_USER_SUCCESS]: removeUser,
  [DELETE_USER_FAILURE]: setError,

  [GENERATE_UPLOAD_TOKEN_REQUEST]: setUploadTokenGenerating,
  [GENERATE_UPLOAD_TOKEN_SUCCESS]: setUploadToken,
  [GENERATE_UPLOAD_TOKEN_FAILURE]: setError,

})

