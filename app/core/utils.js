import Cookie from 'js-cookie'
export const createReducer = (initial, handler) => {
  return (state = initial, action) => {
    if (handler.hasOwnProperty(action.type)) {
      return handler[action.type](state, action)
    }
    return state
  }
}

export const setToken = (token) => localStorage.setItem('token', token)
export const getToken = () => {
  const googleToken = Cookie.get('token')
  if (googleToken) {
    return googleToken
  }
  return localStorage.getItem('token')
}
export const removeGoogleCookie = () => Cookie.remove('token')

