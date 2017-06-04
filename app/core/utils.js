export const createReducer = (initial, handler) => {
  return (state = initial, action) => {
    if (handler.hasOwnProperty(action.type)) {
      return handler[action.type](state, action)
    }
    return state
  }
}

export const setToken = (token) => localStorage.setItem('token', token)
export const getToken = () => localStorage.getItem('token')