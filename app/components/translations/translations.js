import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getTranslationsRequest} from './actions'
import {filterTranslationsByLanguage} from './selectors'
import TranslationCard from 'components/translationCard/translationCard'

const mapState = (state) => {
  return {
    translations: filterTranslationsByLanguage(state)
  }
}

const mapDispatch = (dispatch) => {
  return {
    getTranslations: () => dispatch(getTranslationsRequest())
  }
}

@connect(mapState, mapDispatch)
export default class Translations extends PureComponent {

  renderCards(translations) {
    return translations.map((translation, i) => (
      <TranslationCard key={i} translation={translation} />
    ))
  }

  render() {
    const {
      translations
    } = this.props

    return (
      <div className="container">
        {this.renderCards(translations)}
      </div>
    )
  }
}

Translations.propTypes = {
  translations: PropTypes.array
}