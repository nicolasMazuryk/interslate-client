import {takeLatest, all} from 'redux-saga/effects'
import {loadApplication} from 'components/main/saga'
import {
  LOAD_APPLICATION_REQUEST
} from 'components/main/actions'
import {translations} from 'components/translations/saga'
import {
  GET_TRANSLATIONS_REQUEST
} from 'components/translations/actions'

export default function* main() {
  yield all([
    takeLatest(LOAD_APPLICATION_REQUEST, loadApplication),
    takeLatest(GET_TRANSLATIONS_REQUEST, translations)
  ])
}