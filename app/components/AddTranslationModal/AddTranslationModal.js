import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Modal from 'common/Modal/Modal'
import Input from 'common/Input/Input'
import TranslationField from './TranslationField/TranslationField'
import TranslationTable from './TranslationTable/TranslationTable'

export default class AddTranslationModal extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      key: '',
      translations: [],
      availableLanguages: []
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onTranslationKeyChange = this.onTranslationKeyChange.bind(this)
    this.onTranslationRemove = this.onTranslationRemove.bind(this)
    this.onTranslationAdd = this.onTranslationAdd.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentWillReceiveProps({languages}) {
    if (this.state.translations.length === 0) {
      this.setState({availableLanguages: languages})
    }
  }

  componentDidMount() {
    const {languages} = this.props
    this.setState({availableLanguages: languages})
  }

  onTranslationKeyChange(e) {
    this.setState({
      key: e.target.value
    })
  }

  onTranslationAdd(translation) {
    const {languages} = this.props
    const [selected] = languages.filter(({key}) => translation.language === key)
    this.setState(({availableLanguages, translations}) => {
      const index = availableLanguages.indexOf(selected)
      return {
        translations: [...translations, translation],
        availableLanguages: [
          ...availableLanguages.slice(0, index),
          ...availableLanguages.slice(index + 1)
        ]
      }
    })
  }

  onTranslationRemove(index) {
    const translation = this.state.translations[index]
    const [language] = this.props.languages.filter(({key}) => key === translation.language)
    this.setState(({translations, availableLanguages}) => {
      return {
        translations: [
          ...translations.slice(0, index),
          ...translations.slice(index + 1)
        ],
        availableLanguages: [...availableLanguages, language]
      }
    })
  }

  onSubmit(e) {
    e.preventDefault()
    const {key, translations} = this.state
    this.props.onSubmit({key, values: translations})
    this.setState({
      key: '',
      translations: [],
      availableLanguages: this.props.languages
    })
    this.closeModal()
  }

  closeModal() {
    this.setState({
      key: '',
      translations: [],
      availableLanguages: []
    })
    this.props.onClose()
  }

  render() {
    const {
      key,
      translations,
      availableLanguages
    } = this.state
    const {
      opened,
      languages,
    } = this.props

    return (
      <Modal
        title='Add Translation'
        opened={opened}
        onSubmit={this.onSubmit}
        submitIsDisabled={key.trim().length === 0}
        onClose={this.closeModal}
      >
        <form>
          <Input
            type="text"
            placeholder="Your key ..."
            helpText="Type a key to your translations"
            name="key"
            label="Key"
            value={key}
            onChange={this.onTranslationKeyChange}
          />
          <div className="field">
            <label className="label">Translations</label>
          </div>
          {availableLanguages.length > 0 &&
            <TranslationField
              languages={availableLanguages}
              onAdd={this.onTranslationAdd}
            />
          }
          {translations.length > 0 &&
            <TranslationTable
              translations={translations}
              languages={languages}
              onRemove={this.onTranslationRemove}
            />
          }
        </form>
      </Modal>
    )
  }
}

AddTranslationModal.propTypes = {
  opened: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  languages: PropTypes.array,
}
