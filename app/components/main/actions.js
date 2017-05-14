export const LOAD_APPLICATION_REQUEST = 'LOAD_APPLICATION_REQUEST'
export const LOAD_APPLICATION_SUCCESS = 'LOAD_APPLICATION_SUCCESS'
export const LOAD_APPLICATION_FAILURE = 'LOAD_APPLICATION_FAILURE'

export const SELECT_LANGUAGE = 'SELECT_LANGUAGE'

export const loadApplicationRequest = () => {
  return {
    type: LOAD_APPLICATION_REQUEST
  }
}

export const loadApplicationSuccess = (payload) => {
  return {
    type: LOAD_APPLICATION_SUCCESS,
    payload
  }
}

export const loadApplicationFailure = (error) => {
  return {
    type: LOAD_APPLICATION_FAILURE,
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