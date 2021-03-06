import Cookie from 'js-cookie'

export const createReducer = (initial, handler) => {
  return (state = initial, action) => {
    if (handler.hasOwnProperty(action.type)) {
      return handler[action.type](state, action)
    }
    return state
  }
}

export const setLocalStorageItem = (name, value) => localStorage.setItem(name, value)
export const getLocalStorageItem = (name) => localStorage.getItem(name)
export const getCookie = (name) => Cookie.get(name)
export const removeCookie = (name) => Cookie.remove(name)

