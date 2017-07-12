import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import TranslationsRow from './TranslationsRow/TranslationsRow'
import Pagination from 'common/Pagination/Pagination'

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

    return translations.map(({key, values, _id}) => {
      const translation = (values[0] || {}).translation
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
      <div className="box">
        <table className="table is-bordered">
          <thead>
          <tr>
            <th style={{width: '30%'}}>Key</th>
            <th style={{width: '60%'}}>Translation</th>
            <th style={{width: '10%'}}>Actions</th>
          </tr>
          </thead>
          <tbody>
          {translations.length > 0
            ? this.makeTranslations()
            : <tr><td style={{textAlign: 'center'}} colSpan={3}>No data is available</td></tr>
          }
          </tbody>
        </table>
        <Pagination
          shownCount={10}
          totalCount={213}
          loadItems={() => {}}
          limitCountChange={() => {}}
        />
      </div>
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
