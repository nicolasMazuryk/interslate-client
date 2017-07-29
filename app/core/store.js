import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux'
import mainReducer from 'core/main/reducer'
import translationsReducer from 'core/translations/reducer'
import accountReducer from 'core/account/reducer'
import mainSaga from './saga'
import {loadState, syncState} from './localStorage'
import {throttle} from './utils'

const sagaMiddleware = createSagaMiddleware()
const reducer = combineReducers({
  main: mainReducer,
  translations: translationsReducer,
  account: accountReducer,
})
const localStorageState = loadState()
const store = createStore(
  reducer,
  localStorageState,
  applyMiddleware(logger, sagaMiddleware)
)

store.subscribe(
  throttle(() => syncState(store.getState()), 200)
)

sagaMiddleware.run(mainSaga)

export default store
