import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Select from 'common/Select/Select'

export default class TranslationField extends Component {

  constructor(props) {
    super(props)

    this.state = {
      translation: '',
      language: ''
    }

    this.onAdd = this.onAdd.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.onChange = this.onChange.bind(this)
    this.getLanguageKey = this.getLanguageKey.bind(this)
  }

  componentWillReceiveProps() {
    this.setState({
      language: this.getLanguageKey()
    })
  }

  onChange(e) {
    const value = e.target.value
    const field = e.target.getAttribute('name')

    this.setState({
      [field]: value
    })
  }

  onAdd(e) {
    e.preventDefault()
    this.props.onAdd(this.state)
  }

  onRemove(e) {
    e.preventDefault()
    this.props.onRemove(this.props.index)
  }

  getLanguageKey() {
    const {languages, language} = this.props
    if (language) {
      return language
    }
    return languages[0] && languages[0].key
  }

  render() {
    const {
      languages,
      translation
    } = this.props
    const {language} = this.state

    return (
      <div className="field has-addons">
        <p className="control">
          <Select
            label="Language"
            name="language"
            options={languages}
            value={language}
            onChange={this.onChange}
          />
        </p>
        <p className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="example: Home"
            name="translation"
            value={translation}
            onChange={this.onChange}
          />
        </p>
        <p className="control">
          {translation ?
            (
              <button
                name="remove"
                onClick={this.onRemove}
                className="button is-outlined is-danger"
              >
                Remove
              </button>
            ) :
            (
              <button
                name="add"
                onClick={this.onAdd}
                className="button is-outlined"
              >
                Add
              </button>
            )
          }
        </p>
      </div>
    )
  }
}

TranslationField.propTypes = {
  languages: PropTypes.array,
  language: PropTypes.string,
  translation: PropTypes.string,
  index: PropTypes.number,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func
}