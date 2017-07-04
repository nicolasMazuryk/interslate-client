import React from 'react'
import {mount} from 'enzyme'
import Input from './Input'
import sinon from 'sinon'

const monkeyPatch = (obj, method, fn) => {
  const oldFn = Input.prototype[method]
  Input.prototype[method] = function () {
    fn.apply(this)
    oldFn.apply(this)
  }
}

describe('<Input />', () => {
  let wrapper, value, focus,
    className, placeholder,
    label, name, onChange,
    helpText

  before(() => {
    focus = sinon.spy()
    value = 'test'
    placeholder = 'placeholder'
    name = 'name'
    className = 'is-small'
    label = 'label'
    helpText = 'test'
    onChange = sinon.spy()
    monkeyPatch(Input.prototype, 'componentDidMount', function () {
      this.input.focus = focus
    })
    wrapper = mount(
      <Input
        label={label}
        className={className}
        placeholder={placeholder}
        name={name}
        focus={true}
        value={value}
        onChange={onChange}
      />
    )
  })

  it('should render input with proper props', () => {
    const props = {
      className: `input ${className}`,
      name,
      placeholder,
      value,
      onChange
    }
    expect(wrapper.find('input').props()).to.include(props)
  })

  it('should render label with text', () => {
    wrapper = mount(
      <Input
        label={label}
        className={className}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    )
    expect(wrapper.find('label').text()).to.equal(label)
  })

  it('should add class is-danger if helpText is passed', () => {
    wrapper = mount(
      <Input
        label={label}
        className={className}
        placeholder={placeholder}
        helpText={helpText}
        name={name}
        value={value}
        onChange={onChange}
      />
    )
    const expected = 'input is-small is-danger'
    expect(wrapper.find('input').prop('className')).to.equal(expected)
  })

  it('should call onChange', () => {
    wrapper.find('input').simulate('change')
    expect(onChange.calledOnce).to.be.true
  })

  it('should insert help text', () => {
    expect(wrapper.find('.help.is-danger').text()).to.equal(helpText)
  })

  it('should not call focus', () => {
    const focus = sinon.spy()
    wrapper = mount(
      <Input
        label={label}
        className={className}
        placeholder={placeholder}
        name={name}
        focus={false}
        value={value}
        onChange={onChange}
      />
    )
    expect(focus.calledOnce).to.be.false
  })

  it('should call focus', () => {
    expect(focus.calledOnce).to.be.true
  })
})
