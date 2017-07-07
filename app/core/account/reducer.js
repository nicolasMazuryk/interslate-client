import {createReducer} from 'core/utils'
import {
  GENERATE_API_KEY_REQUEST,
  GENERATE_API_KEY_SUCCESS,
  GENERATE_API_KEY_FAILURE
} from './actions'

const DEFAULT_STATE = {
  APIKeyIsGenerating: false,
  APIKey: '',
  error: null
}

const setAPIKeyGenerating = (state) => {
  return {
    ...state,
    APIKeyIsGenerating: true
  }
}

const setAPIKey = (state, action) => {
  return {
    ...state,
    APIKeyIsGenerating: false,
    APIKey: action.payload
  }
}

const setError = (state, action) => {
  return {
    ...state,
    APIKeyIsGenerating: false,
    error: action.payload
  }
}

export default createReducer(DEFAULT_STATE, {
  [GENERATE_API_KEY_REQUEST]: setAPIKeyGenerating,
  [GENERATE_API_KEY_SUCCESS]: setAPIKey,
  [GENERATE_API_KEY_FAILURE]: setError
})
