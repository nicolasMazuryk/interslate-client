import {put, call, all, takeLatest} from 'redux-saga/effects'
import request from 'core/request'
import {setToken, getToken} from 'core/utils'
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  GET_CURRENT_USER_REQUEST,
  REGISTER_REQUEST,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  getCurrentUserSuccess,
  getCurrentUserFailure,
  registerSuccess,
  registerFailure
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
    if (!token) {
      throw new Error('No token')
    }
    const {payload} = yield call(request, '/auth/current', {token})
    yield put(getCurrentUserSuccess(payload))
  }
  catch (error) {
    yield put(getCurrentUserFailure(error))
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

export default function* main() {
  yield all([
    takeLatest(LOGIN_REQUEST, login),
    takeLatest(LOGOUT_REQUEST, logout),
    takeLatest(GET_CURRENT_USER_REQUEST, getCurrentUser),
    takeLatest(REGISTER_REQUEST, register)
  ])
}