import {fork} from 'redux-saga/effects'
import translationsSaga from 'core/translations/saga'
import mainSaga from 'core/main/saga'

export default function* main() {
  yield fork(mainSaga)
  yield fork(translationsSaga)
}
