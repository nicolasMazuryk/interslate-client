import {setLocalStorageItem, getLocalStorageItem} from './utils'

export const syncState = (state) => {
  try {
    const serialized = JSON.stringify(state)
    setLocalStorageItem('state', serialized)
    return serialized
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
