import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TranslationField from 'components/AddTranslationModal/TranslationField/TranslationField'

export default class TranslationFieldContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      availableLanguages: []
    }

    this.getAvailableLanguages = this.getAvailableLanguages.bind(this)
  }

  getAvailableLanguages() {
    const {translations} = this.props
    const {languages} = this.props
    debugger
    const keys = translations.map(({language: langKey}) => langKey)
    return languages.filter(({key}) => !keys.includes(key))
  }

  componentWillReceiveProps(nextProps) {
    const {translations} = nextProps
    if (translations.length > 0) {
      return this.setState({
        availableLanguages: this.getAvailableLanguages()
      })
    }
    this.setState({
      availableLanguages: nextProps.languages
    })
  }

  render() {
    const {availableLanguages} = this.state
    const {
      translations,
      onAdd,
      onRemove
    } = this.props

    return (
      <div>
        <div className="field">
          <label className="label">Translations</label>
        </div>
        {translations.map((translation, i) => {
          return (
            <TranslationField
              key={i}
              index={i}
              languages={availableLanguages}
              onRemove={onRemove}
              {...translation}
            />
          )
        })}
        <TranslationField
          languages={availableLanguages}
          onAdd={onAdd}
        />
      </div>
    )
  }

}

TranslationFieldContainer.propTypes = {
  translations: PropTypes.array,
  languages: PropTypes.array,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func
}