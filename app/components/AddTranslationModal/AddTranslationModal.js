import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Modal from 'common/Modal/Modal'
import Input from 'common/Input/Input'
import TranslationFieldContainer from './TranslationField/TranslationFieldContainer'

export default class AddTranslationModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      key: '',
      translations: []
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onTranslationKeyChange = this.onTranslationKeyChange.bind(this)
    this.onTranslationRemove = this.onTranslationRemove.bind(this)
    this.onTranslationAdd = this.onTranslationAdd.bind(this)
  }

  onTranslationKeyChange(e) {
    this.setState({
      key: e.target.value
    })
  }

  onTranslationAdd(translation) {
    this.setState(prev => {
      return {
        translations: [...prev.translations, translation]
      }
    })
  }

  onTranslationRemove(index) {
    this.setState(prev => ({
      translations: [
        ...prev.translations.split(0, index),
        ...prev.translations.split(index + 1)
      ]
    }))
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render() {
    const {key, translations} = this.state

    const {
      opened,
      onClose,
      languages
    } = this.props

    return (
      <Modal
        title='Add Translation'
        opened={opened}
        onSubmit={this.onSubmit}
        onClose={onClose}
      >
        <form>
          <Input
            type="text"
            placeholder="example: PAGES.HOME"
            name="key"
            label="Key"
            value={key}
            onChange={this.onTranslationKeyChange}
          />
          <TranslationFieldContainer
            languages={languages}
            translations={translations}
            onAdd={this.onTranslationAdd}
            onRemove={this.onTranslationRemove}
          />
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