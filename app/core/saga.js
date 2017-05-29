import {fork} from 'redux-saga/effects'
import translations from 'core/translations/saga'

export default function* main() {
  yield fork(translations)
}