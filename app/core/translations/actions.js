export const GET_TRANSLATIONS_REQUEST = 'GET_TRANSLATIONS_REQUEST'
export const GET_TRANSLATIONS_SUCCESS = 'GET_TRANSLATIONS_SUCCESS'
export const GET_TRANSLATIONS_FAILURE = 'GET_TRANSLATIONS_FAILURE'

export const UPLOAD_TRANSLATIONS_REQUEST = 'UPLOAD_TRANSLATIONS_REQUEST'
export const UPLOAD_TRANSLATIONS_SUCCESS = 'UPLOAD_TRANSLATIONS_SUCCESS'
export const UPLOAD_TRANSLATIONS_FAILURE = 'UPLOAD_TRANSLATIONS_FAILURE'

export const ADD_TRANSLATION_REQUEST = 'ADD_TRANSLATION_REQUEST'
export const ADD_TRANSLATION_SUCCESS = 'ADD_TRANSLATION_SUCCESS'
export const ADD_TRANSLATION_FAILURE = 'ADD_TRANSLATION_FAILURE'

export const REMOVE_TRANSLATION_REQUEST = 'REMOVE_TRANSLATION_REQUEST'
export const REMOVE_TRANSLATION_SUCCESS = 'REMOVE_TRANSLATION_SUCCESS'
export const REMOVE_TRANSLATION_FAILURE = 'REMOVE_TRANSLATION_FAILURE'

export const UPDATE_TRANSLATION_REQUEST = 'UPDATE_TRANSLATION_REQUEST'
export const UPDATE_TRANSLATION_SUCCESS = 'UPDATE_TRANSLATION_SUCCESS'
export const UPDATE_TRANSLATION_FAILURE = 'UPDATE_TRANSLATION_FAILURE'

export const OPEN_ADD_TRANSLATION_MODAL = 'OPEN_ADD_TRANSLATION_MODAL'
export const CLOSE_ADD_TRANSLATION_MODAL = 'CLOSE_ADD_TRANSLATION_MODAL'

export const GET_LANGUAGES_REQUEST = 'GET_LANGUAGES_REQUEST'
export const GET_LANGUAGES_SUCCESS = 'GET_LANGUAGES_SUCCESS'
export const GET_LANGUAGES_FAILURE = 'GET_LANGUAGES_FAILURE'

export const SELECT_LANGUAGE = 'SELECT_LANGUAGE'
export const SEARCH_FILTER_CHANGE = 'SEARCH_FILTER_CHANGE'
export const PAGINATION_LIMIT_COUNT_CHANGE = 'PAGINATION_LIMIT_COUNT_CHANGE'

export const SELECT_TRANSLATION = 'SELECT_TRANSLATION'
export const DESELECT_TRANSLATION = 'DESELECT_TRANSLATION'

export const getTranslationsRequest = () => {
  return {
    type: GET_TRANSLATIONS_REQUEST
  }
}

export const getTranslationsSuccess = ({meta, translations}) => {
  return {
    type: GET_TRANSLATIONS_SUCCESS,
    payload: {meta, translations}
  }
}

export const getTranslationsFailure = (error) => {
  return {
    type: GET_TRANSLATIONS_FAILURE,
    payload: error,
    error: true
  }
}

export const uploadTranslationsRequest = () => {
  return {
    type: UPLOAD_TRANSLATIONS_REQUEST
  }
}

export const uploadTranslationsSuccess = (translations) => {
  return {
    type: UPLOAD_TRANSLATIONS_SUCCESS,
    payload: translations
  }
}

export const uploadTranslationsFailure = (error) => {
  return {
    type: UPLOAD_TRANSLATIONS_FAILURE,
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

export const removeTranslationRequest = (_id) => {
  return {
    type: REMOVE_TRANSLATION_REQUEST,
    payload: _id
  }
}

export const removeTranslationSuccess = (_id) => {
  return {
    type: REMOVE_TRANSLATION_SUCCESS,
    payload: _id
  }
}

export const removeTranslationFailure = (error) => {
  return {
    type: REMOVE_TRANSLATION_FAILURE,
    payload: error,
    error: true
  }
}

export const updateTranslationRequest = (_id, value) => {
  return {
    type: UPDATE_TRANSLATION_REQUEST,
    payload: {_id, value}
  }
}

export const updateTranslationSuccess = (newTranslation) => {
  return {
    type: UPDATE_TRANSLATION_SUCCESS,
    payload: newTranslation
  }
}

export const updateTranslationFailure = (error) => {
  return {
    type: UPDATE_TRANSLATION_FAILURE,
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

export const searchFilterChange = (searchValue) => {
  return {
    type: SEARCH_FILTER_CHANGE,
    payload: searchValue
  }
}

export const paginationLimitCountChange = (limit) => {
  return {
    type: PAGINATION_LIMIT_COUNT_CHANGE,
    payload: limit
  }
}

export const selectTranslation = (_id) => {
  return {
    type: SELECT_TRANSLATION,
    payload: _id
  }
}

export const deselectTranslation = (_id) => {
  return {
    type: DESELECT_TRANSLATION,
    payload: _id
  }
}

