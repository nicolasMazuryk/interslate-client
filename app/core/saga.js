import {fork} from 'redux-saga/effects'
import translations from 'core/translations/saga'
import auth from 'core/auth/saga'

export default function* main() {
  yield fork(auth)
  yield fork(translations)
}