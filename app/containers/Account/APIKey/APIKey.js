import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {generateAPIKeyRequest} from 'core/account/actions'
import {copyToClipboard} from 'core/utils'

const mapState = ({account}) => {
  return {
    apiKey: account.APIKey,
    APIKeyIsGenerating: account.APIKeyIsGenerating
  }
}

const mapDispatch = (dispatch) => {
  return {
    generateAPIKey: () => dispatch(generateAPIKeyRequest())
  }
}

export class APIKey extends PureComponent {
  
  constructor(props) {
    super(props)
    this.copyAPIKeyToClipboard = this.copyAPIKeyToClipboard.bind(this)
  }
  
  copyAPIKeyToClipboard() {
    this.props.copyToClipboard(this.textArea)
  }
  
  render() {
    const {
      apiKey,
      APIKeyIsGenerating,
      generateAPIKey
    } = this.props
    
    return (
      <div>
        <div className="content">
          <p>
            Generate your upload <b>API key</b> for making requests to
            &nbsp;<span className="tag is-medium">/uploads/translations?token=YOUR-API-KEY</span>&nbsp;
            endpoint.
          </p>
        </div>
        <div className="field">
          <p className={`control textarea-control${APIKeyIsGenerating && ' is-loading'}`}>
            <textarea
              readOnly
              value={apiKey}
              ref={(element) => this.textArea = element}
              className="textarea"
              placeholder="API key"
            />
          </p>
        </div>
        <div className="field is-grouped">
          <p className="control">
            <button
              onClick={generateAPIKey}
              className="button is-success generate-api-key"
            >
              Generate
            </button>
          </p>
          <p className="control">
            <button onClick={this.copyAPIKeyToClipboard} className="button copy-to-clipboard">
              Copy to clipboard
            </button>
          </p>
        </div>
      </div>
    )
  }
}

APIKey.propTypes = {
  apiKey: PropTypes.string,
  APIKeyIsGenerating: PropTypes.bool,
  generateAPIKey: PropTypes.func,
  copyToClipboard: PropTypes.func
}

APIKey.defaultProps = {
  copyToClipboard
}

export default connect(mapState, mapDispatch)(APIKey)
