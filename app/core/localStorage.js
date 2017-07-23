import {setLocalStorageItem, getLocalStorageItem} from './utils'

export const syncState = (state) => {
  try {
    if (!state.main.user) {
      return setLocalStorageItem('state', '')
    }
    const serialized = JSON.stringify(state)
    setLocalStorageItem('state', serialized)
  }
  catch (error) {
    console.log(error) //eslint-disable-line
  }
}

export const loadState = () => {
  try {
    const serialized = getLocalStorageItem('state')
    if (serialized) {
      return JSON.parse(serialized)
    }
    return undefined
  }
  catch (error) {
    return undefined
  }
}
