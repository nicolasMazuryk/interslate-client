import {createSelector} from 'reselect'
import propEq from 'ramda/src/propEq'
import filter from 'ramda/src/filter'
import pipe from 'ramda/src/pipe'
import map from 'ramda/src/map'
import reduce from 'ramda/src/reduce'

export const getLanguage = (state) => (
  state.translations.selectedLanguage
)

export const getLanguages = (state) => (
  state.translations.languages
)

export const getGroups = (state) => (
  state.translations.selectedGroups
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
  [getTranslations, getSearchFilterValue, getLanguage, getGroups],
  (translations, searchFilterValue, selectedLanguage, selectedGroups) => {
    const translationsKeys = Object.keys(translations)

    const getTranslation = (translations) => (key) => translations[key]

    const filterByGroup = (translation) => {
      return !selectedGroups.length || selectedGroups.includes(translation.group)
    }

    const filterBySearchValue = (translation) => {
      return translation.key.toLowerCase().includes(searchFilterValue)
    }

    const filterValuesBySelectedLanguage = (selectedLanguage) => (translation) => {
      translation.values = filter(propEq('language', selectedLanguage), translation.values)
      return translation
    }

    const convertToObject = (acc, translation) => ({...acc, [translation.key]: translation})

    const apply = pipe(
      map(getTranslation(translations)),
      filter(filterByGroup),
      filter(filterBySearchValue),
      map(filterValuesBySelectedLanguage(selectedLanguage)),
      reduce(convertToObject, {})
    )

    return apply(translationsKeys)
  }
)
