import {createSelector} from 'reselect'
import propEq from 'ramda/src/propEq'
import transduce from 'ramda/src/transduce'
import flip from 'ramda/src/flip'
import append from 'ramda/src/append'
import pipe from 'ramda/src/pipe'
import filter from 'ramda/src/filter'
import map from 'ramda/src/map'

export const getLanguage = (state) => (
  state.translations.selectedLanguage
)

export const getLanguages = (state) => (
  state.translations.languages
)

export const getTranslations = (state) => (
  state.translations.data
)

export const getSearchFilterValue = (state) => (
  state.translations.searchFilterValue.toLowerCase()
)

export const getMappedLanguages = createSelector(
  [getLanguages],
  (languages) => {
    return languages.map(({code, name}) => ({key: code, value: name}))
  }
)

export const applyFilters = createSelector(
  [getTranslations, getSearchFilterValue, getLanguage],
  (translations, searchFilterValue, selectedLanguage) => {
    const appendToArray = flip(append)
    const transducer = pipe(
      filter(({key}) => key.toLowerCase().includes(searchFilterValue)),
      map((item) => ({...item, values: filter(propEq('language', selectedLanguage), item.values)}))
    )
    return transduce(transducer, appendToArray, [], translations)
  }
)