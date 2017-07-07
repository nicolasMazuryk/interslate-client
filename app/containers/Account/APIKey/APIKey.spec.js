import React from 'react'
import {APIKey} from './APIKey'
import {mount} from 'enzyme'
import sinon from 'sinon'

describe('<APIKey />', () => {
  let wrapper, key, generateAPIKey,
    APIKeyIsGenerating, copyToClipboard
  
  before(() => {
    key = 'test'
    APIKeyIsGenerating = false
    generateAPIKey = sinon.spy()
    copyToClipboard = sinon.spy()
    wrapper = mount(
      <APIKey
        apiKey={key}
        APIKeyIsGenerating={APIKeyIsGenerating}
        generateAPIKey={generateAPIKey}
        copyToClipboard={copyToClipboard}
      />
    )
  })
  
  it('should render textarea for api key', () => {
    expect(wrapper.find('textarea').props().value).to.equal(key)
  })
  
  it('should render button for generating key', () => {
    wrapper.find('button.generate-api-key').simulate('click')
    expect(generateAPIKey.calledOnce).to.be.true
  })
  
  it('should render button for copying key to clipboard', () => {
    const element = wrapper.instance().textArea
    wrapper.find('button.copy-to-clipboard').simulate('click')
    expect(copyToClipboard.calledWith(element)).to.be.true
  })
  
  it('should show loader in textarea if key is generating', () => {
    wrapper.setProps({APIKeyIsGenerating: true})
    expect(wrapper.find('.textarea-control').props().className).to.contain('is-loading')
  })
})
