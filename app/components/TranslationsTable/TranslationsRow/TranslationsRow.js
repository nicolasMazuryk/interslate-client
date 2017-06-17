import React from 'react'
import PropTypes from 'prop-types'
import EditableTranslation from '../EditableTranslation/EditableTranslation'
import EditableKey from '../EditableKey/EditableKey'

const TranslationsRow = (props) => {
  const {
    _id,
    tKey,
    translation,
    onUpdate,
    onRemove
  } = props
  
  const placeholder = 'Edit ...'
  
  const onKeyEdit = (key) => {
    if (key !== tKey) {
      onUpdate(_id, {key})
    }
  }
  
  const onTranslationEdit = (newTranslation) => {
    if (translation !== newTranslation && newTranslation !== placeholder) {
      onUpdate(_id, {translation})
    }
  }
  
  return (
    <tr key={_id}>
      <td>
        <EditableKey
          value={tKey}
          onSave={onKeyEdit}
          propMapper={({value, ...other}) => ({tKey: value, ...other})}
        />
      </td>
      <td>
        <EditableTranslation
          value={translation || placeholder}
          onSave={onTranslationEdit}
          propMapper={(props, {value}) => {
            return ({translation: value, ...props})
          }}
        />
      </td>
      <td>
        <button onClick={() => onRemove(_id)} className="delete" />
      </td>
    </tr>
  )
}

TranslationsRow.propTypes = {
  _id: PropTypes.string,
  tKey: PropTypes.string,
  translation: PropTypes.string,
  onRemove: PropTypes.func,
  onUpdate: PropTypes.func,
}

export default TranslationsRow