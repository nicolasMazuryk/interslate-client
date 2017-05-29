import React from 'react'
import PropTypes from 'prop-types'

const TranslationsTable = (props) => {
  const {
    translations,
    onRemove
  } = props

  return (
    <table className="table is-striped is-narrow is-bordered">
      <tbody>
        {translations.map((tran, index) => {
          const {language, translation} = tran
          return (
            <tr key={index}>
              <td>{language}</td>
              <td>{translation}</td>
              <td>
                <button
                  name="remove"
                  className="delete"
                  onClick={(e) => {
                    e.preventDefault()
                    onRemove(index)
                  }}
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
  onRemove: PropTypes.func
}

export default TranslationsTable
