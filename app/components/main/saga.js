import {call, put} from 'redux-saga/effects'
import request from 'core/request'
import {
  loadApplicationSuccess,
  loadApplicationFailure
} from './actions'

export function* loadApplication() {
  try {
    const payload = yield call(request, '/api/v1/languages')
    yield put(loadApplicationSuccess(payload))
  }
  catch (error) {
    yield put(loadApplicationFailure(error))
  }
}