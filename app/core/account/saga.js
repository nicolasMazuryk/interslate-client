import {put, call, all, select, takeLatest} from 'redux-saga/effects'
import {getLocalStorageItem} from 'core/utils'
import request from 'core/request'
import {
  GENERATE_API_KEY_REQUEST,
  generateAPIKeySuccess,
  generateAPIKeyFailure
} from './actions'

function* generateAPIKey() {
  try {
    const userId = yield select(state => state.main.user._id)
    const token = yield call(getLocalStorageItem, 'token')
    const {payload} = yield call(request, `/api/v1/users/${userId}/uploadToken`, {token})
    yield put(generateAPIKeySuccess(payload))
  }
  catch (error) {
    yield put(generateAPIKeyFailure(error))
  }
}

export default function* account() {
  yield all([
    takeLatest(GENERATE_API_KEY_REQUEST, generateAPIKey)
  ])
}
