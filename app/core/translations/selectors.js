import {createSelector} from 'reselect'
import propEq from 'ramda/src/propEq'
import filter from 'ramda/src/filter'

export const getLanguage = (state) => (
  state.translations.selectedLanguage
)

export const getLanguages = (state) => (
  state.translations.languages
)

export const getRecentlySelectedLanguages = (state) => (
  state.translations.recentlySelectedLanguages
)

export const getTranslations = (state) => (
  state.translations.data
)

export const getSearchFilterValue = (state) => (
  state.translations.searchFilterValue.toLowerCase()
)

export const getMappedLanguages = createSelector(
  [getLanguages, getRecentlySelectedLanguages],
  (languages, recent) => {
    const mapLanguage = ({code, name}) => ({key: code, value: name})
    return [
      languages.map(mapLanguage),
      recent.map(mapLanguage)
    ]
  }
)

export const applyFilters = createSelector(
  [getTranslations, getSearchFilterValue, getLanguage],
  (translations, searchFilterValue, selectedLanguage) => {
    return Object.keys(translations).reduce((acc, _id) => {
      const translation = {...translations[_id]}
      const {key} = translation
      if (key.toLowerCase().includes(searchFilterValue)) {
        translation.values = filter(propEq('language', selectedLanguage), translation.values)
        return {
          ...acc,
          [_id]: translation
        }
      }
      return acc
    }, {})
  }
)
