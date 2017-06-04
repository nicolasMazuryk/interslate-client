import {put, call, all, takeLatest} from 'redux-saga/effects'
import request from 'core/request'
import {setToken, getToken} from 'core/utils'
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure
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

export default function* main() {
  yield all([
    takeLatest(LOGIN_REQUEST, login),
    takeLatest(LOGOUT_REQUEST, logout)
  ])
}