import {createReducer} from 'core/utils'
import {
  GET_TRANSLATIONS_REQUEST,
  GET_TRANSLATIONS_SUCCESS,
  GET_TRANSLATIONS_FAILURE
} from './actions'

const DEFAULT_STATE = {
  loading: false,
  data: [],
  error: null
}

const getTranslationsRequest = (state) => {
  return {
    ...state,
    loading: true
  }
}

const getTranslationsSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    data: action.payload,
    error: null
  }
}

const getTranslationsFailure = (state) => {
  return {
    ...state,
    loading: false,
    error: state.payload
  }
}

export default createReducer(DEFAULT_STATE, {

  [GET_TRANSLATIONS_REQUEST]: getTranslationsRequest,
  [GET_TRANSLATIONS_SUCCESS]: getTranslationsSuccess,
  [GET_TRANSLATIONS_FAILURE]: getTranslationsFailure

})