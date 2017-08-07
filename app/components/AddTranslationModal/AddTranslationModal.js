import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Modal from 'common/Modal/Modal'
import Input from 'common/Input/Input'
import TranslationField from './TranslationField/TranslationField'
import TranslationTable from './TranslationTable/TranslationTable'
import GroupsAutocomplete from './GroupsAutocomplete/GroupsAutocomplete'

export default class AddTranslationModal extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      key: '',
      group: '',
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
    const {key, group, translations} = this.state
    this.props.onSubmit({
      key,
      group: group || null,
      values: translations
    })
    this.setState({
      key: '',
      group: '',
      translations: [],
      availableLanguages: this.props.languages
    })
    this.closeModal()
  }

  closeModal() {
    this.setState({
      key: '',
      group: '',
      translations: [],
      availableLanguages: []
    })
    this.props.onClose()
  }

  render() {
    const {
      key,
      group,
      translations,
      availableLanguages
    } = this.state

    const {
      opened,
      languages,
      groups
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
          <div className="columns">
            <div className="column">
              <Input
                type="text"
                placeholder="Your key ..."
                helpText="Type a key to your translations"
                name="key"
                label="Key"
                value={key}
                onChange={this.onTranslationKeyChange}
              />
            </div>
            <div className="column">
              <GroupsAutocomplete
                groups={groups}
                group={group}
                changeGroup={(e) => this.setState({group: e.target.value})}
                selectGroup={(group) => this.setState({group})}
              />
            </div>
          </div>
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
  groups: PropTypes.arrayOf(PropTypes.string)
}
