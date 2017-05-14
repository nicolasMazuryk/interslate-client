import {call, put} from 'redux-saga/effects'
import request from 'core/request'
import {
  getTranslationsSuccess,
  getTranslationsFailure
} from './actions'

export function* translations() {
  try {
    const payload = yield call(request, '/api/v1/translations')
    yield put(getTranslationsSuccess(payload))
  }
  catch (error) {
    yield put(getTranslationsFailure(error))
  }
}