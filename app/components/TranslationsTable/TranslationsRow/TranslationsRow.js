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
    onRemove,
    onCheckboxClick,
    isSelected
  } = props

  const placeholder = 'Edit ...'
  const selectedStyle = {backgroundColor: '#ededed'}

  const onKeyEdit = (key) => {
    if (key !== tKey) {
      onUpdate(_id, {key})
    }
  }
  
  const onTranslationEdit = (newTranslation) => {
    if (translation !== newTranslation && newTranslation !== placeholder) {
      onUpdate(_id, {translation: newTranslation})
    }
  }

  return (
    <tr style={isSelected ? selectedStyle : {}} key={_id}>
      <td>
        <label className="checkbox">
          <input
            onClick={() => onCheckboxClick(_id)}
            checked={isSelected}
            type="checkbox"
          />
        </label>
      </td>
      <td>
        <EditableKey
          value={tKey}
          onSave={onKeyEdit}
          mapEditablePropsToComponent={({value, ...other}) => {
            return {tKey: value || placeholder, ...other}
          }}
        />
      </td>
      <td>
        <EditableTranslation
          placeholder={placeholder}
          value={translation}
          onSave={onTranslationEdit}
          mapEditablePropsToComponent={({value, ...other}) => {
            return {translation: value || placeholder, ...other}
          }}
        />
      </td>
      <td style={{textAlign: 'center'}}>
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
  onCheckboxClick: PropTypes.func,
  isSelected: PropTypes.bool
}

export default TranslationsRow
