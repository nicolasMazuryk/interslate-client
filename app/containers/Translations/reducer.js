import {createReducer} from 'core/utils'
import {
  GET_TRANSLATIONS_REQUEST,
  GET_TRANSLATIONS_SUCCESS,
  GET_TRANSLATIONS_FAILURE,

  GET_LANGUAGES_SUCCESS,
  GET_LANGUAGES_FAILURE,

  ADD_TRANSLATION_REQUEST,
  ADD_TRANSLATION_SUCCESS,
  ADD_TRANSLATION_FAILURE,

  OPEN_ADD_TRANSLATION_MODAL,
  CLOSE_ADD_TRANSLATION_MODAL,

  SELECT_LANGUAGE
} from './actions'

const DEFAULT_STATE = {
  translationsAreLoading: false,
  adding: false,
  addTranslationModalIsOpened: false,
  languages: [],
  selectedLanguage: '',
  data: [],
  error: null
}

const getTranslationsRequest = (state) => {
  return {
    ...state,
    translationsAreLoading: true
  }
}

const getTranslationsSuccess = (state, action) => {
  return {
    ...state,
    translationsAreLoading: false,
    data: action.payload,
    error: null
  }
}

const getTranslationsFailure = (state) => {
  return {
    ...state,
    translationsAreLoading: false,
    error: state.payload
  }
}

const addTranslationRequest = (state) => {
  return {
    ...state,
    adding: true
  }
}

const addTranslationSuccess = (state, action) => {
  return {
    ...state,
    adding: false,
    data: [action.payload, ...state.data],
    error: null
  }
}

const addTranslationFailure = (state, action) => {
  return {
    ...state,
    adding: false,
    error: action.payload
  }
}

const openTranslationModal = (state) => {
  return {
    ...state,
    addTranslationModalIsOpened: true
  }
}

const closeTranslationModal = (state) => {
  return {
    ...state,
    addTranslationModalIsOpened: false
  }
}

export const selectLanguage = (state, action) => {
  return {
    ...state,
    selectedLanguage: action.payload
  }
}

export const getLanguagesSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    languages: action.payload,
  }
}

export const getLanguagesFailure = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.payload
  }
}


export default createReducer(DEFAULT_STATE, {

  [GET_TRANSLATIONS_REQUEST]: getTranslationsRequest,
  [GET_TRANSLATIONS_SUCCESS]: getTranslationsSuccess,
  [GET_TRANSLATIONS_FAILURE]: getTranslationsFailure,

  [GET_LANGUAGES_SUCCESS]: getLanguagesSuccess,
  [GET_LANGUAGES_FAILURE]: getLanguagesFailure,

  [ADD_TRANSLATION_REQUEST]: addTranslationRequest,
  [ADD_TRANSLATION_SUCCESS]: addTranslationSuccess,
  [ADD_TRANSLATION_FAILURE]: addTranslationFailure,

  [OPEN_ADD_TRANSLATION_MODAL]: openTranslationModal,
  [CLOSE_ADD_TRANSLATION_MODAL]: closeTranslationModal,

  [SELECT_LANGUAGE]: selectLanguage

})