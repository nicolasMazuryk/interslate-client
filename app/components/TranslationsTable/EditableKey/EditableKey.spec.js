import React from 'react'
import {shallow} from 'enzyme'
import {Key} from './EditableKey'

describe('<EditableKey />', () => {
  it('should render provided key', () => {
    const tKey = 'test'
    const wrapper = shallow(
      <Key
        tKey={tKey}
      />
    )
    expect(wrapper.text()).to.equal(tKey)
  })
})
