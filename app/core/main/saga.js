import {put, call, all, takeLatest} from 'redux-saga/effects'
import request from 'core/request'
import {setToken, getToken, removeGoogleCookie} from 'core/utils'
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  GET_CURRENT_USER_REQUEST,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  getCurrentUserSuccess,
  getCurrentUserFailure
} from './actions'

function* login(action) {
  try {
    const options = {
      method: 'POST',
      body: action.payload
    }
    const {payload} = yield call(request, '/auth/login', options)
    yield call(setToken, payload.token)
    yield put(loginSuccess(payload))
  }
  catch (error) {
    yield put(loginFailure(error))
  }
}

function* logout() {
  try {
    const token = getToken()
    yield call(request, '/auth/logout', {token})
    yield call(setToken, '')
    yield put(logoutSuccess())
  }
  catch (error) {
    yield put(logoutFailure(error))
  }
}

function* getCurrentUser() {
  try {
    const token = getToken()
    yield call(removeGoogleCookie)
    const {payload} = yield call(request, '/auth/current', {token})
    yield put(getCurrentUserSuccess(payload))
  }
  catch (error) {
    yield put(getCurrentUserFailure(error))
  }
}

export default function* main() {
  yield all([
    takeLatest(LOGIN_REQUEST, login),
    takeLatest(LOGOUT_REQUEST, logout),
    takeLatest(GET_CURRENT_USER_REQUEST, getCurrentUser)
  ])
}