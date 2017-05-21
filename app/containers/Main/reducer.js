import {createReducer} from 'core/utils'
import {
  LOGOUT
} from './actions'

export const DEFAULT_STATE = {
  error: null
}


export default createReducer(DEFAULT_STATE, {
  [LOGOUT]: (state) => state,
})
