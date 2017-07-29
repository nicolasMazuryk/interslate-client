import {createReducer} from 'core/utils'
import {
  OPEN_DELETE_ACCOUNT_MODAL,
  CLOSE_DELETE_ACCOUNT_MODAL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_FAILURE,
} from './actions'

const DEFAULT_STATE = {
  deleteAccountModalOpened: false
}

const setLoading = (state) => {
  return {
    ...state,
    loading: true
  }
}

const setError = (state, action) => {
  return {
    ...state,
    error: action.payload,
    loading: false
  }
}

const openDeleteAccountModal = (state) => {
  return {
    ...state,
    deleteAccountModalOpened: true
  }
}

const closeDeleteAccountModal = (state) => {
  return {
    ...state,
    deleteAccountModalOpened: false
  }
}

export default createReducer(DEFAULT_STATE, {

  [OPEN_DELETE_ACCOUNT_MODAL]: openDeleteAccountModal,
  [CLOSE_DELETE_ACCOUNT_MODAL]: closeDeleteAccountModal,

  [CHANGE_PASSWORD_REQUEST]: setLoading,
  [CHANGE_PASSWORD_FAILURE]: setError,

})
