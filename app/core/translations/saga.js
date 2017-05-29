import {call, select, put, all, takeLatest, takeEvery} from 'redux-saga/effects'
import request from 'core/request'
import {getLanguage} from './selectors'
import {
  GET_TRANSLATIONS_REQUEST,
  GET_LANGUAGES_REQUEST,
  ADD_TRANSLATION_REQUEST,
  REMOVE_TRANSLATION_REQUEST,
  UPDATE_TRANSLATION_REQUEST
} from './actions'
import {
  getTranslationsSuccess,
  getTranslationsFailure,
  getLanguagesSuccess,
  getLanguagesFailure,
  addTranslationSuccess,
  addTranslationFailure,
  removeTranslationSuccess,
  removeTranslationFailure,
  updateTranslationSuccess,
  updateTranslationFailure,
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

export function* removeTranslation(action) {
  try {
    const options = {
      method: 'DELETE'
    }
    yield call(request, `api/v1/translations/${action.payload}`, options)
    yield put(removeTranslationSuccess(action.payload))
  }
  catch (error) {
    yield put(removeTranslationFailure(error))
  }
}

export function* updateTranslation(action) {
  try {
    const {value, _id} = action.payload
    const language = yield select(getLanguage)
    const options = {
      method: 'PATCH',
      body: {language, translation: value.translation}
    }
    yield call(request, `api/v1/translations/${_id}`, options)
    yield put(updateTranslationSuccess(action.payload))
  }
  catch (error) {
    yield put(updateTranslationFailure(error))
  }
}

export default function* main() {
  yield all([
    takeLatest(GET_TRANSLATIONS_REQUEST, getTranslations),
    takeLatest(GET_LANGUAGES_REQUEST, getLanguages),
    takeEvery(ADD_TRANSLATION_REQUEST, addTranslation),
    takeEvery(REMOVE_TRANSLATION_REQUEST, removeTranslation),
    takeEvery(UPDATE_TRANSLATION_REQUEST, updateTranslation)
  ])
}
