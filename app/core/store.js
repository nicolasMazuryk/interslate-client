import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux'
import mainReducer from 'containers/main/reducer'
import translationsReducer from 'containers/translations/reducer'
import mainSaga from './saga'

const sagaMiddleware = createSagaMiddleware()
const reducer = combineReducers({
  main: mainReducer,
  translations: translationsReducer
})

const store = createStore(
  reducer,
  applyMiddleware(logger, sagaMiddleware)
)

sagaMiddleware.run(mainSaga)

export default store