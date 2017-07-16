import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import TranslationsRow from './TranslationsRow/TranslationsRow'
import Pagination from 'common/Pagination/Pagination'
import Loader from 'common/Loader/Loader'
import Fade from 'common/Fade/Fade'

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

    return Object.keys(translations).map((_id) => {
      const {key, values} = translations[_id]
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
    const {
      translations,
      pagination: {total, limit},
      paginationLimitCountChange,
      translationsAreLoading,
      getTranslations
    } = this.props

    const translationsLength = Object.keys(translations).length

    return (
      <div style={{position: 'relative'}} className="box">
        <Fade show={translationsAreLoading}>
          <Loader/>
        </Fade>
        <table className="table is-bordered">
          <thead>
          <tr>
            <th style={{width: '30%'}}>Key</th>
            <th style={{width: '60%'}}>Translation</th>
            <th style={{width: '10%'}}>Actions</th>
          </tr>
          </thead>
          <tbody>
          {translationsLength > 0
            ? this.makeTranslations()
            : <tr><td style={{textAlign: 'center'}} colSpan={3}>No data is available</td></tr>
          }
          </tbody>
        </table>
        <Pagination
          limitCount={limit}
          totalCount={total}
          shownCount={translationsLength}
          loading={translationsAreLoading}
          loadItems={getTranslations}
          limitCountChange={paginationLimitCountChange}
        />
      </div>
    )
  }

}

TranslationsTable.propTypes = {
  translations: PropTypes.object,
  pagination: PropTypes.shape({
    limit: PropTypes.number,
    total: PropTypes.number
  }),
  translationsAreLoading: PropTypes.bool,
  onTranslationRemove: PropTypes.func,
  onTranslationUpdate: PropTypes.func,
  paginationLimitCountChange: PropTypes.func,
  getTranslations: PropTypes.func
}

export default TranslationsTable
