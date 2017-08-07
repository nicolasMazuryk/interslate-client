export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST'
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE'

export const GENERATE_UPLOAD_TOKEN_REQUEST = 'GENERATE_UPLOAD_TOKEN_REQUEST'
export const GENERATE_UPLOAD_TOKEN_SUCCESS = 'GENERATE_UPLOAD_TOKEN_SUCCESS'
export const GENERATE_UPLOAD_TOKEN_FAILURE = 'GENERATE_UPLOAD_TOKEN_FAILURE'

export const OPEN_DELETE_ACCOUNT_MODAL = 'OPEN_DELETE_ACCOUNT_MODAL'
export const CLOSE_DELETE_ACCOUNT_MODAL = 'CLOSE_DELETE_ACCOUNT_MODAL'

export const changePasswordRequest = (passwords) => {
  return {
    type: CHANGE_PASSWORD_REQUEST,
    payload: passwords
  }
}

export const changePasswordSuccess = () => {
  return {
    type: CHANGE_PASSWORD_SUCCESS
  }
}

export const changePasswordFailure = (error) => {
  return {
    type: CHANGE_PASSWORD_FAILURE,
    payload: error,
    error: true
  }
}

export const generateUploadTokenRequest = () => ({
  type: GENERATE_UPLOAD_TOKEN_REQUEST
})

export const generateUploadTokenSuccess = (uploadToken) => ({
  type: GENERATE_UPLOAD_TOKEN_SUCCESS,
  payload: uploadToken
})

export const generateUploadTokenFailure = (error) => ({
  type: GENERATE_UPLOAD_TOKEN_FAILURE,
  error: true,
  payload: error
})

export const openDeleteAccountModal = () => ({
  type: OPEN_DELETE_ACCOUNT_MODAL
})

export const closeDeleteAccountModal = () => ({
  type: CLOSE_DELETE_ACCOUNT_MODAL
})
