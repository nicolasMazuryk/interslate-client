export const GET_TRANSLATIONS_REQUEST = 'GET_TRANSLATIONS_REQUEST'
export const GET_TRANSLATIONS_SUCCESS = 'GET_TRANSLATIONS_SUCCESS'
export const GET_TRANSLATIONS_FAILURE = 'GET_TRANSLATIONS_FAILURE'

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
