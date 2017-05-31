import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import TranslationsRow from './TranslationsRow/TranslationsRow'

class TranslationsTable extends PureComponent {

  constructor(props) {
    super(props)

    this.makeTranslations = this.makeTranslations.bind(this)
  }

  makeTranslations() {
    const {
      translations,
      onTranslationRemove,
      onTranslationUpdate
    } = this.props

    return translations.map(({key, translation, _id}) => {
      return (
        <TranslationsRow
          key={_id}
          tKey={key}
          translation={translation}
          _id={_id}
          onUpdate={onTranslationUpdate}
          onRemove={onTranslationRemove}
        />
      )
    })
  }

  render() {
    const {translations} = this.props

    return (
      <table className="table is-bordered">
        <thead>
        <tr>
          <th>Key</th>
          <th>Translation</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {translations.length > 0
          ? this.makeTranslations()
          : <tr><td style={{textAlign: 'center'}} colSpan={3}>No data is available</td></tr>
        }
        </tbody>
      </table>
    )
  }

}

TranslationsTable.propTypes = {
  translations: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value:PropTypes.string,
    _id: PropTypes.string
  })),
  onTranslationRemove: PropTypes.func,
  onTranslationUpdate: PropTypes.func
}

export default TranslationsTable
