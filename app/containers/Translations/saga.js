import {call, put, all, takeLatest} from 'redux-saga/effects'
import request from 'core/request'
import {
  GET_TRANSLATIONS_REQUEST,
  GET_LANGUAGES_REQUEST,
  ADD_TRANSLATION_REQUEST
} from './actions'
import {
  getTranslationsSuccess,
  getTranslationsFailure,
  getLanguagesSuccess,
  getLanguagesFailure,
  addTranslationSuccess,
  addTranslationFailure
} from './actions'

export function* getTranslations() {
  try {
    const {payload} = yield call(request, '/api/v1/translations')
    yield put(getTranslationsSuccess(payload))
  }
  catch (error) {
    yield put(getTranslationsFailure(error))
  }
}

export function* getLanguages() {
  try {
    const payload = yield call(request, '/api/v1/languages')
    yield put(getLanguagesSuccess(payload))
  }
  catch (error) {
    yield put(getLanguagesFailure(error))
  }
}

export function* addTranslation(action) {
  try {
    const options = {
      method: 'POST',
      body: action.payload
    }
    const {payload} = yield call(request, '/api/v1/translations', options)
    yield put(addTranslationSuccess(payload))
  }
  catch (error) {
    yield put(addTranslationFailure(error))
  }
}

export default function* main() {
  yield all([
    takeLatest(GET_TRANSLATIONS_REQUEST, getTranslations),
    takeLatest(GET_LANGUAGES_REQUEST, getLanguages),
    takeLatest(ADD_TRANSLATION_REQUEST, addTranslation)
  ])
}
