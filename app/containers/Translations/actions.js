export const GET_TRANSLATIONS_REQUEST = 'GET_TRANSLATIONS_REQUEST'
export const GET_TRANSLATIONS_SUCCESS = 'GET_TRANSLATIONS_SUCCESS'
export const GET_TRANSLATIONS_FAILURE = 'GET_TRANSLATIONS_FAILURE'

export const ADD_TRANSLATION_REQUEST = 'ADD_TRANSLATION_REQUEST'
export const ADD_TRANSLATION_SUCCESS = 'ADD_TRANSLATION_SUCCESS'
export const ADD_TRANSLATION_FAILURE = 'ADD_TRANSLATION_FAILURE'

export const OPEN_ADD_TRANSLATION_MODAL = 'OPEN_ADD_TRANSLATION_MODAL'
export const CLOSE_ADD_TRANSLATION_MODAL = 'CLOSE_ADD_TRANSLATION_MODAL'

export const GET_LANGUAGES_REQUEST = 'GET_LANGUAGES_REQUEST'
export const GET_LANGUAGES_SUCCESS = 'GET_LANGUAGES_SUCCESS'
export const GET_LANGUAGES_FAILURE = 'GET_LANGUAGES_FAILURE'

export const SELECT_LANGUAGE = 'SELECT_LANGUAGE'

export const getTranslationsRequest = () => {
  return {
    type: GET_TRANSLATIONS_REQUEST
  }
}

export const getTranslationsSuccess = (translations) => {
  return {
    type: GET_TRANSLATIONS_SUCCESS,
    payload: translations
  }
}

export const getTranslationsFailure = (error) => {
  return {
    type: GET_TRANSLATIONS_SUCCESS,
    payload: error,
    error: true
  }
}

export const addTranslationRequest = (translation) => {
  return {
    type: ADD_TRANSLATION_REQUEST,
    payload: translation
  }
}

export const addTranslationSuccess = (translation) => {
  return {
    type: ADD_TRANSLATION_SUCCESS,
    payload: translation
  }
}

export const addTranslationFailure = (error) => {
  return {
    type: ADD_TRANSLATION_FAILURE,
    payload: error,
    error: true
  }
}

export const openAddTranslationModal = () => {
  return {
    type: OPEN_ADD_TRANSLATION_MODAL
  }
}

export const closeAddTranslationModal = () => {
  return {
    type: CLOSE_ADD_TRANSLATION_MODAL
  }
}

export const getLanguagesRequest = () => {
  return {
    type: GET_LANGUAGES_REQUEST
  }
}

export const getLanguagesSuccess = (languages) => {
  return {
    type: GET_LANGUAGES_SUCCESS,
    payload: languages
  }
}

export const getLanguagesFailure = (error) => {
  return {
    type: GET_LANGUAGES_FAILURE,
    payload: error,
    error: true
  }
}

export const selectLanguage = (key) => {
  return {
    type: SELECT_LANGUAGE,
    payload: key
  }
}

