import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import EditableTranslation from './EditableTranslation/EditableTranslation'
import EditableKey from './EditableKey/EditableKey'

class TranslationsTable extends PureComponent {

  constructor(props) {
    super(props)

    this.makeTranslations = this.makeTranslations.bind(this)
  }

  componentWillReceiveProps(next) {
    debugger
  }

  makeTranslations() {
    const {
      translations,
      onTranslationRemove,
      onTranslationUpdate
    } = this.props

    return translations.map(({key, translation, _id}) => {
      debugger
      return(
        <tr key={_id}>
          <td>
            <EditableKey
              value={key}
              onSave={(key) => onTranslationUpdate(_id, {key})}
              propMapper={({value, ...other}) => ({tKey: value, ...other})}
            />
          </td>
          <td>
            <EditableTranslation
              value={translation || 'Edit ...'}
              onSave={(translation) => onTranslationUpdate(_id, {translation})}
              propMapper={(props, {value}) => {
                return ({translation: value, ...props})
              }}
            />
          </td>
          <td>
            <button onClick={() => onTranslationRemove(_id)} className="delete" />
          </td>
        </tr>
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
