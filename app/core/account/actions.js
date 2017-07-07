export const GENERATE_API_KEY_REQUEST = 'GENERATE_API_KEY_REQUEST'
export const GENERATE_API_KEY_SUCCESS = 'GENERATE_API_KEY_SUCCESS'
export const GENERATE_API_KEY_FAILURE = 'GENERATE_API_KEY_FAILURE'

export const generateAPIKeyRequest = () => ({
  type: GENERATE_API_KEY_REQUEST
})

export const generateAPIKeySuccess = (APIKey) => ({
  type: GENERATE_API_KEY_SUCCESS,
  payload: APIKey
})

export const generateAPIKeyFailure = (error) => ({
  type: GENERATE_API_KEY_FAILURE,
  error: true,
  payload: error
})
