import {createReducer} from 'core/utils'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  GET_CURRENT_USER_REQUEST,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE,
  RECOVER_REQUEST,
  RECOVER_SUCCESS,
  RECOVER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GENERATE_UPLOAD_TOKEN_REQUEST,
  GENERATE_UPLOAD_TOKEN_SUCCESS,
  GENERATE_UPLOAD_TOKEN_FAILURE
} from './actions'

const DEFAULT_STATE = {
  loading: false,
  uploadTokenIsGenerating: false,
  user: null,
  newUser: null,
  error: null,
}

const setLoading = (state) => {
  return {
    ...state,
    loading: true
  }
}

const unsetLoading = (state) => {
  return {
    ...state,
    loading: false
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
  
  [GET_CURRENT_USER_REQUEST]: setLoading,
  [GET_CURRENT_USER_SUCCESS]: setUser,
  [GET_CURRENT_USER_FAILURE]: setError,

  [RECOVER_REQUEST]: setLoading,
  [RECOVER_SUCCESS]: unsetLoading,
  [RECOVER_FAILURE]: setError,

  [REGISTER_REQUEST]: setLoading,
  [REGISTER_SUCCESS]: setNewUser,
  [REGISTER_FAILURE]: setError,

  [GENERATE_UPLOAD_TOKEN_REQUEST]: setUploadTokenGenerating,
  [GENERATE_UPLOAD_TOKEN_SUCCESS]: setUploadToken,
  [GENERATE_UPLOAD_TOKEN_FAILURE]: setError

})

