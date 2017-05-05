require('babel-core/register')()

const JSDOM = require('jsdom').JSDOM
const chai = require('chai')

const exposedProperties = ['window', 'navigator', 'document']
const dom = new JSDOM('')

global.document = dom.window.document
global.window = document.defaultView
global.expect = chai.expect

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property)
    global[property] = document.defaultView[property]
  }
})

global.navigator = {
  userAgent: 'node.js'
}