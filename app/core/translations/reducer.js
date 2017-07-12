import {createReducer} from 'core/utils'
import {
  GET_TRANSLATIONS_REQUEST,
  GET_TRANSLATIONS_SUCCESS,
  GET_TRANSLATIONS_FAILURE,

  UPLOAD_TRANSLATIONS_REQUEST,
  UPLOAD_TRANSLATIONS_SUCCESS,
  UPLOAD_TRANSLATIONS_FAILURE,

  GET_LANGUAGES_SUCCESS,
  GET_LANGUAGES_FAILURE,

  ADD_TRANSLATION_REQUEST,
  ADD_TRANSLATION_SUCCESS,
  ADD_TRANSLATION_FAILURE,

  REMOVE_TRANSLATION_REQUEST,
  REMOVE_TRANSLATION_SUCCESS,
  REMOVE_TRANSLATION_FAILURE,

  UPDATE_TRANSLATION_REQUEST,
  UPDATE_TRANSLATION_SUCCESS,
  UPDATE_TRANSLATION_FAILURE,

  OPEN_ADD_TRANSLATION_MODAL,
  CLOSE_ADD_TRANSLATION_MODAL,

  SELECT_LANGUAGE,
  SEARCH_FILTER_CHANGE
} from './actions'

const DEFAULT_STATE = {
  translationsAreLoading: false,
  translationsAreUploading: false,
  adding: false,
  removing: false,
  addTranslationModalIsOpened: false,
  languages: [],
  selectedLanguage: '',
  searchFilterValue: '',
  data: [],
  uploadData: {},
  pagination: {
    limit: 10,
    total: 0,
    loaded: 0
  },
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

const getTranslationsFailure = (state, action) => {
  return {
    ...state,
    translationsAreLoading: false,
    error: action.payload
  }
}

const uploadTranslationsRequest = (state) => {
  return {
    ...state,
    translationsAreUploading: true,
  }
}

const uploadTranslationsSuccess = (state, action) => {
  return {
    ...state,
    translationsAreUploading: false,
    uploadData: action.payload,
    error: null
  }
}

const uploadTranslationsFailure = (state, action) => {
  return {
    ...state,
    translationsAreUploading: false,
    error: action.payload
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

const removeTranslationRequest = (state) => {
  return {
    ...state,
    removing: true
  }
}

const removeTranslationSuccess = (state, action) => {
  const index = state.data.findIndex(({_id}) => _id === action.payload)
  return {
    ...state,
    removing: false,
    data: [
      ...state.data.slice(0, index),
      ...state.data.slice(index + 1)
    ],
    error: null
  }
}

const removeTranslationFailure = (state, action) => {
  return {
    ...state,
    removing: false,
    error: action.payload
  }
}

const updateTranslationRequest = (state) => {
  return {
    ...state,
    updating: true
  }
}

const updateTranslationSuccess = (state, action) => {
  return {
    ...state,
    updating: false,
    data: state.data.map((target) => {
      if (target._id === action.payload._id) {
        return {
          ...target,
          key: action.payload.key,
          values: action.payload.values
        }
      }
      return target
    }),
    error: null
  }
}

const updateTranslationFailure = (state, action) => {
  return {
    ...state,
    updating: false,
    error: action.payload,
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

const selectLanguage = (state, action) => {
  return {
    ...state,
    selectedLanguage: action.payload
  }
}

const getLanguagesSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    languages: action.payload,
  }
}

const getLanguagesFailure = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.payload
  }
}

const searchFilterChange = (state, action) => {
  return {
    ...state,
    searchFilterValue: action.payload
  }
}

export default createReducer(DEFAULT_STATE, {
  [GET_TRANSLATIONS_REQUEST]: getTranslationsRequest,
  [GET_TRANSLATIONS_SUCCESS]: getTranslationsSuccess,
  [GET_TRANSLATIONS_FAILURE]: getTranslationsFailure,

  [UPLOAD_TRANSLATIONS_REQUEST]: uploadTranslationsRequest,
  [UPLOAD_TRANSLATIONS_SUCCESS]: uploadTranslationsSuccess,
  [UPLOAD_TRANSLATIONS_FAILURE]: uploadTranslationsFailure,

  [GET_LANGUAGES_SUCCESS]: getLanguagesSuccess,
  [GET_LANGUAGES_FAILURE]: getLanguagesFailure,

  [ADD_TRANSLATION_REQUEST]: addTranslationRequest,
  [ADD_TRANSLATION_SUCCESS]: addTranslationSuccess,
  [ADD_TRANSLATION_FAILURE]: addTranslationFailure,

  [REMOVE_TRANSLATION_REQUEST]: removeTranslationRequest,
  [REMOVE_TRANSLATION_SUCCESS]: removeTranslationSuccess,
  [REMOVE_TRANSLATION_FAILURE]: removeTranslationFailure,

  [UPDATE_TRANSLATION_REQUEST]: updateTranslationRequest,
  [UPDATE_TRANSLATION_SUCCESS]: updateTranslationSuccess,
  [UPDATE_TRANSLATION_FAILURE]: updateTranslationFailure,

  [OPEN_ADD_TRANSLATION_MODAL]: openTranslationModal,
  [CLOSE_ADD_TRANSLATION_MODAL]: closeTranslationModal,

  [SELECT_LANGUAGE]: selectLanguage,
  [SEARCH_FILTER_CHANGE]: searchFilterChange
})
