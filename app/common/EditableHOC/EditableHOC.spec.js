import React from 'react'
import {mount} from 'enzyme'
import editable from './EditableHOC'
import sinon from 'sinon'

describe('<Editable(Component) />', () => {

  let Component, Editable,
    wrapper, text, onSave,
    placeholder, inputValue

  before(() => {
    inputValue = 'value'
    onSave = sinon.spy()
    text = 'Test'
    placeholder = 'Test'
    Component = ({text}) => <div className="test">{text}</div> //eslint-disable-line
    Editable = editable(Component)
    wrapper = mount(
      <Editable
        placeholder={placeholder}
        value={text}
        mapEditablePropsToComponent={({value}) => ({text: value})}
        onSave={onSave}
      />
    )
  })

  it('should render div with value text', () => {
    expect(wrapper.text()).to.equal(text)
  })

  it('should render input when element is clicked', () => {
    wrapper.find('div.test').simulate('click')
    expect(wrapper.find({placeholder}).is('input')).to.be.true
  })

  it('should change state value', () => {
    wrapper.find('input').simulate('change', {
      target: {
        value: inputValue
      }
    })
    expect(wrapper.state('value')).to.equal(inputValue)
  })

  it('should call onSave callback on blur with input value', () => {
    wrapper.find('input').simulate('blur')
    expect(onSave.calledWith(inputValue)).to.be.true
  })

})