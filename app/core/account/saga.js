import {call, put, all, select, takeLatest} from 'redux-saga/effects'
import request from 'core/request'
import {getLocalStorageItem} from 'core/utils'
import {
  GENERATE_UPLOAD_TOKEN_REQUEST,
  CHANGE_PASSWORD_REQUEST,
  generateUploadTokenSuccess,
  generateUploadTokenFailure,
  changePasswordSuccess,
  changePasswordFailure
} from './actions'

function* changeUserPassword(action) {
  try {
    const options = {
      method: 'POST',
      token: getLocalStorageItem('token'),
      body: action.payload
    }
    const userId = yield select(state => state.main.user._id)
    yield call(request, `/api/v1/users/${userId}/resetPassword`, options)
    yield put(changePasswordSuccess())
  }
  catch(error) {
    yield put(changePasswordFailure(error))
  }
}

function* generateAPIKey() {
  try {
    const userId = yield select(state => state.main.user._id)
    const token = yield call(getLocalStorageItem, 'token')
    const {payload} = yield call(request, `/api/v1/users/${userId}/uploadToken`, {token})
    yield put(generateUploadTokenSuccess(payload))
  }
  catch (error) {
    yield put(generateUploadTokenFailure(error))
  }
}

export default function* main() {
  yield all([
    takeLatest(GENERATE_UPLOAD_TOKEN_REQUEST, generateAPIKey),
    takeLatest(CHANGE_PASSWORD_REQUEST, changeUserPassword)
  ])
}
