import {createReducer} from 'core/utils'
import {
  LOAD_APPLICATION_SUCCESS,
  LOAD_APPLICATION_FAILURE,
  SELECT_LANGUAGE
} from './actions'

export const DEFAULT_STATE = {
  loaded: false,
  languages: [],
  selectedLanguage: '',
  error: null
}

export const loadApplicationSuccess = (state, action) => {
  return {
    ...state,
    loaded: true,
    error: null,
    languages: action.payload,
  }
}

export const loadApplicationFailure = (state, action) => {
  return {
    ...state,
    loaded: true,
    error: action.payload
  }
}

export const selectLanguage = (state, action) => {
  return {
    ...state,
    selectedLanguage: action.payload
  }
}

export default createReducer(DEFAULT_STATE, {
  [LOAD_APPLICATION_SUCCESS]: loadApplicationSuccess,
  [LOAD_APPLICATION_FAILURE]: loadApplicationFailure,
  [SELECT_LANGUAGE]: selectLanguage
})
