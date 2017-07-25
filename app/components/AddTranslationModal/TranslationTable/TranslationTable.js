import React from 'react'
import PropTypes from 'prop-types'

const languageCellStyle = {
  width: '23%',
}

const removeButtonCellStyle = {
  width: '10%',
  textAlign: 'center'
}

const TranslationsTable = (props) => {
  const {
    translations,
    languages,
    onRemove
  } = props

  const removeRow = (index) => (e) => {
    e.preventDefault()
    onRemove(index)
  }

  return (
    <table className="table is-striped is-narrow is-bordered">
      <tbody>
        {translations.map((tran, index) => {
          const {language, translation} = tran
          const fullLanguageName = (languages.find(({key}) => key === language) || {}).value
          return (
            <tr key={index}>
              <td style={languageCellStyle}>{`${fullLanguageName} (${language})`}</td>
              <td>{translation}</td>
              <td style={removeButtonCellStyle}>
                <button
                  name="remove"
                  className="delete"
                  onClick={removeRow(index)}
                />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

TranslationsTable.propTypes = {
  translations: PropTypes.arrayOf(PropTypes.shape({
    language: PropTypes.string,
    translation: PropTypes.string
  })),
  languages: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string
  })),
  onRemove: PropTypes.func
}

export default TranslationsTable
