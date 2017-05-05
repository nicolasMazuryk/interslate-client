import logger from 'redux-logger'
import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux'
import main from 'components/main/reducer'

const reducer = combineReducers({
  main
})

const store = createStore(
  reducer,
  applyMiddleware(logger)
)

export default store