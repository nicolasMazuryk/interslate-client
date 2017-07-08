import React from 'react'
import PropTypes from 'prop-types'
import Prism from 'prismjs'

const Code = ({data, style, withHTML}) => {
  const defaultStyle = {
    height: '70vh',
    overflow: 'scroll'
  }

  const stringifiedCode = stringifyCode(data)

  function stringifyCode(data) {
    if (typeof data === 'object') {
      return JSON.stringify(data, null, 2)
    }
    if (Array.isArray(data)) {
      return `[${data.toString()}]`
    }
    if (typeof data === 'string') {
      return data
    }
  }

  const highlightedCode = Prism.highlight(
    withHTML ? stringifiedCode : lookupMarkup(stringifiedCode),
    Prism.languages.javascript
  )

  function lookupMarkup (string) {
    if (/<[a-z][\s\S]*>/i.test(string)) {
      return ''
    }
    return string
  }

  return (
    <pre style={{...defaultStyle, ...style}}>
      <code dangerouslySetInnerHTML={{__html: highlightedCode}} />
    </pre>
  )
}

Code.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string
  ]).isRequired,
  style: PropTypes.object,
  withHTML: PropTypes.bool
}

Code.defaultProps = {
  withHTML: false
}

export default Code
