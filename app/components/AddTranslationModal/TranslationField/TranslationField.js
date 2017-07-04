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
    this.onChange = this.onChange.bind(this)
    this.getLanguageKey = this.getLanguageKey.bind(this)
    this.setProvidedLanguage = this.setProvidedLanguage.bind(this)
  }

  getLanguageKey({languages}) {
    return languages[0] ? languages[0].key : ''
  }
  
  setProvidedLanguage(props) {
    this.setState({
      language: this.getLanguageKey(props)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setProvidedLanguage(nextProps)
  }

  componentDidMount() {
    this.setProvidedLanguage(this.props)
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
    this.setState({
      translation: ''
    })
  }

  render() {
    const {
      languages
    } = this.props
    const {language, translation} = this.state

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
              <button
                name="add"
                onClick={this.onAdd}
                className="button is-outlined"
              >
                Add
              </button>
        </p>
      </div>
    )
  }
}

TranslationField.propTypes = {
  languages: PropTypes.array,
  translation: PropTypes.string,
  onAdd: PropTypes.func,
}
