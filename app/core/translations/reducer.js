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

  GET_TRANSLATION_GROUPS_REQUEST,
  GET_TRANSLATION_GROUPS_SUCCESS,
  GET_TRANSLATION_GROUPS_FAILURE,

  OPEN_ADD_TRANSLATION_MODAL,
  CLOSE_ADD_TRANSLATION_MODAL,

  SELECT_LANGUAGE,
  SEARCH_FILTER_CHANGE,
  PAGINATION_LIMIT_COUNT_CHANGE,
  SELECT_TRANSLATION,
  DESELECT_TRANSLATION,
  SELECT_TRANSLATION_GROUP,
  DESELECT_TRANSLATION_GROUP
} from './actions'

const DEFAULT_STATE = {
  translationsAreLoading: false,
  translationsAreUploading: false,
  groupsAreLoading: false,
  adding: false,
  removing: false,
  addTranslationModalIsOpened: false,
  languages: [],
  groups: [],
  selectedGroups: [],
  selectedTranslations: [],
  recentlySelectedLanguages: [],
  selectedLanguage: '',
  searchFilterValue: '',
  data: {},
  uploadData: {},
  pagination: {
    limit: 10,
    skip: 0,
    total: 0
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
  const {meta, translations} = action.payload
  const translationsLength = Object.keys(translations).length

  return {
    ...state,
    translationsAreLoading: false,
    data: {
      ...state.data,
      ...translations
    },
    error: null,
    pagination: {
      ...state.pagination,
      total: meta.total,
      skip: translationsLength
    }
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
    data: {
      ...state.data,
      [action.payload._id]: action.payload
    },
    pagination: {
      ...state.pagination,
      total: state.pagination.total + 1
    },
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
  const newData = Object.keys(state.data).reduce((acc, _id) => {
    if (_id !== action.payload) {
      return {...acc, [_id]: state.data[_id]}
    }
    return acc
  }, {})

  return {
    ...state,
    data: newData,
    pagination: {
      ...state.pagination,
      total: state.pagination.total - 1
    }
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
    data: {
      ...state.data,
      [action.payload._id]: action.payload
    },
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
    selectedLanguage: action.payload,
    languages: state.languages.filter(({code}) => code !== action.payload),
    recentlySelectedLanguages: [
      ...state.languages.filter(({code}) => code === action.payload),
      ...state.recentlySelectedLanguages.slice(0, 2)
    ]
  }
}

const getLanguagesSuccess = (state, action) => {
  const [recent = {}] = state.recentlySelectedLanguages
  const [first = {}] = action.payload
  return {
    ...state,
    loading: false,
    error: null,
    languages: action.payload,
    selectedLanguage: recent.code || first.code
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

const paginationLimitCountChange = (state, action) => {
  return {
    ...state,
    pagination: {
      ...state.pagination,
      limit: action.payload
    }
  }
}

const selectTranslation = (state, action) => {
  return {
    ...state,
    selectedTranslations: [
      ...state.selectedTranslations,
      action.payload
    ]
  }
}

const deselectTranslation = (state, action) => {
  const index = state.selectedTranslations.findIndex((_id) => _id === action.payload)
  return {
    ...state,
    selectedTranslations: [
      ...state.selectedTranslations.slice(0, index),
      ...state.selectedTranslations.slice(index + 1)
    ]
  }
}

const getTranslationGroupsRequest = (state) => {
  return {
    ...state,
    groupsAreLoading: true
  }
}

const getTranslationGroupsSuccess = (state, action) => {
  return {
    ...state,
    groupsAreLoading: false,
    groups: action.payload
  }
}

const getTranslationGroupsFailure = (state, action) => {
  return {
    ...state,
    groupsAreLoading: false,
    error: action.payload
  }
}

const selectTranslationGroup = (state, action) => {
  return {
    ...state,
    selectedGroups: [
      ...state.selectedGroups,
      action.payload
    ]
  }
}

const deselectTranslationGroup = (state, action) => {
  const index = state.selectedGroups.findIndex((item) => item === action.payload)
  return {
    ...state,
    selectedGroups: [
      ...state.selectedGroups.slice(0, index),
      ...state.selectedGroups.slice(index + 1)
    ]
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

  [GET_TRANSLATION_GROUPS_REQUEST]: getTranslationGroupsRequest,
  [GET_TRANSLATION_GROUPS_SUCCESS]: getTranslationGroupsSuccess,
  [GET_TRANSLATION_GROUPS_FAILURE]: getTranslationGroupsFailure,

  [OPEN_ADD_TRANSLATION_MODAL]: openTranslationModal,
  [CLOSE_ADD_TRANSLATION_MODAL]: closeTranslationModal,

  [SELECT_LANGUAGE]: selectLanguage,
  [SEARCH_FILTER_CHANGE]: searchFilterChange,
  [PAGINATION_LIMIT_COUNT_CHANGE]: paginationLimitCountChange,
  [SELECT_TRANSLATION]: selectTranslation,
  [DESELECT_TRANSLATION]: deselectTranslation,
  [SELECT_TRANSLATION_GROUP]: selectTranslationGroup,
  [DESELECT_TRANSLATION_GROUP]: deselectTranslationGroup
})
