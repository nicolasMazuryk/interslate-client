import {put, call, all, select, takeLatest} from 'redux-saga/effects'
import request from 'core/request'
import {
  setLocalStorageItem,
  getLocalStorageItem,
  getCookie,
  removeCookie
} from 'core/utils'
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  GET_CURRENT_USER_REQUEST,
  RECOVER_REQUEST,
  REGISTER_REQUEST,
  GENERATE_UPLOAD_TOKEN_REQUEST,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  getCurrentUserSuccess,
  getCurrentUserFailure,
  recoverSuccess,
  recoverFailure,
  registerSuccess,
  registerFailure,
  generateUploadTokenSuccess,
  generateUploadTokenFailure
} from './actions'

const provideToken = () => {
  const cookieToken = getCookie('token')
  if (cookieToken) {
    setLocalStorageItem('token', cookieToken)
    removeCookie('token')
  }
  return getLocalStorageItem('token')
}

function* login(action) {
  try {
    const options = {
      method: 'POST',
      body: action.payload
    }
    const {payload} = yield call(request, '/auth/login', options)
    yield call(setLocalStorageItem, 'token', payload.token)
    yield put(loginSuccess(payload))
  }
  catch (error) {
    yield put(loginFailure(error))
  }
}

function* logout() {
  try {
    const token = getLocalStorageItem('token')
    yield call(request, '/auth/logout', {token})
    yield call(setLocalStorageItem, 'token', '')
    yield put(logoutSuccess())
  }
  catch (error) {
    yield put(logoutFailure(error))
  }
}

function* getCurrentUser() {
  try {
    const token = provideToken()
    if (!token) {
      throw new Error('Token is not provided for GET auth/current')
    }
    yield call(removeCookie, 'token')
    const {payload} = yield call(request, '/auth/current', {token})
    yield put(getCurrentUserSuccess(payload))
  }
  catch (error) {
    yield put(getCurrentUserFailure(error))
  }
}

function* recover(action) {
  try {
    const options = {
      method: 'POST',
      body: action.payload
    }
    yield call(request, '/auth/recover', options)
    yield put(recoverSuccess())
  }
  catch (error) {
    yield put(recoverFailure(error))
  }
}

function* register(action) {
  try {
    const options = {
      method: 'POST',
      body: action.payload
    }
    yield call(request, '/auth/register', options)
    yield put(registerSuccess(action.payload))
  }
  catch (error) {
    yield put(registerFailure(error))
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
    takeLatest(LOGIN_REQUEST, login),
    takeLatest(LOGOUT_REQUEST, logout),
    takeLatest(GET_CURRENT_USER_REQUEST, getCurrentUser),
    takeLatest(RECOVER_REQUEST, recover),
    takeLatest(REGISTER_REQUEST, register),
    takeLatest(GENERATE_UPLOAD_TOKEN_REQUEST, generateAPIKey)
  ])
}
