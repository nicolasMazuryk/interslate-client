import Cookie from 'js-cookie'

export const createReducer = (initial, handler) => {
  return (state = initial, action) => {
    if (handler.hasOwnProperty(action.type)) {
      return handler[action.type](state, action)
    }
    return state
  }
}

export const throttle = (fn, delay) => {
  let timeout = null
  return (...args) => {
    timeout && clearTimeout(timeout)
    timeout = setTimeout(fn.bind(null, ...args), delay)
  }
}

export const copyToClipboard = (htmlElement) => {
  try {
    htmlElement.select()
    document.execCommand('copy')
    if (document.selection) {
      document.selection.empty()
    }
    else if (window.getSelection) {
      window.getSelection().removeAllRanges()
    }
  }
  catch (err) {
    console.log(err)
  }
}

export const setLocalStorageItem = (name, value) => localStorage.setItem(name, value)
export const getLocalStorageItem = (name) => localStorage.getItem(name)
export const getCookie = (name) => Cookie.get(name)
export const removeCookie = (name) => Cookie.remove(name)

