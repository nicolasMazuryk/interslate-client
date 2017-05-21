import {createSelector} from 'reselect'
import find from 'ramda/src/find'
import propEq from 'ramda/src/propEq'
import pick from 'ramda/src/pick'

export const getLanguage = (state) => (
  state.translations.selectedLanguage
)

export const getTranslations = (state) => (
  state.translations.data
)

export const filterTranslationsByLanguage = createSelector(
  [getTranslations, getLanguage],
  (translations, selectedLanguage) => {
    const filterTranslation = find(propEq('language', selectedLanguage))
    const getProps = pick(['values', 'key', '_id'])
    return translations
      .map(getProps)
      .map(({values, key, _id}) => {
        const translation = filterTranslation(values)
        return translation ? {_id, key, translation} : null
      })
      .filter(v => v)
  }
)