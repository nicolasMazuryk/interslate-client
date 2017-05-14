import {createSelector} from 'reselect'

export const getLanguage = (state) => (
  state.main.selectedLanguage
)

export const getTranslations = (state) => (
  state.translations.data
)

export const filterTranslationsByLanguage = createSelector(
  [getTranslations, getLanguage],
  (translations, selectedLanguage) => {
    return translations.map((values, ...other) => {
      const translation = values.filter(({language}) => language === selectedLanguage)
      return {
        ...other,
        translation
      }
    })
  }
)