import {createReducer} from 'core/utils'
import {
  LOAD_APPLICATION
} from './actions'

export const DEFAULT_STATE = {
  loaded: false
}

export const loadApplication = (state, action) => {
  return {
    ...state,
    loaded: action.payload
  }
}

export default createReducer(DEFAULT_STATE, {
  [LOAD_APPLICATION]: loadApplication
})
