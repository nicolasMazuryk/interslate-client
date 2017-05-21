import {fork} from 'redux-saga/effects'
import translations from 'containers/translations/saga'

export default function* main() {
  yield fork(translations)
}