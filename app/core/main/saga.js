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
  UPDATE_USER_REQUEST,
  DELETE_USER_REQUEST,
  REGISTER_REQUEST,
  GENERATE_UPLOAD_TOKEN_REQUEST,
  CHANGE_PASSWORD_REQUEST,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  getCurrentUserSuccess,
  getCurrentUserFailure,
  updateUserSuccess,
  updateUserFailure,
  deleteUserSuccess,
  deleteUserFailure,
  registerSuccess,
  registerFailure,
  generateUploadTokenSuccess,
  generateUploadTokenFailure,
  closeDeleteAccountModal,
  changePasswordSuccess,
  changePasswordFailure
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

function* updateUser(action) {
  try {
    const options = {
      method: 'PATCH',
      body: action.payload,
      token: provideToken()
    }
    const userId = yield select(state => state.main.user._id)
    if (!options.token) throw new Error('Token is not provided for PATCH user/:id')
    const {payload} = yield call(request, `/api/v1/users/${userId}`, options)
    yield put(updateUserSuccess(payload))
  }
  catch (error) {
    yield put(updateUserFailure(error))
  }
}

function* deleteUser() {
  try {
    const options = {
      method: 'DELETE',
      token: provideToken()
    }
    const userId = yield select(state => state.main.user._id)
    yield call(request, `/api/v1/users/${userId}`, options)
    yield put(deleteUserSuccess())
    yield put(closeDeleteAccountModal())
  }
  catch (error) {
    yield put(deleteUserFailure())
  }
}

function* changeUserPassword(action) {
  try {
    const options = {
      method: 'POST',
      token: provideToken(),
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
    takeLatest(UPDATE_USER_REQUEST, updateUser),
    takeLatest(DELETE_USER_REQUEST, deleteUser),
    takeLatest(REGISTER_REQUEST, register),
    takeLatest(GENERATE_UPLOAD_TOKEN_REQUEST, generateAPIKey),
    takeLatest(CHANGE_PASSWORD_REQUEST, changeUserPassword)
  ])
}
