import React from 'react'
import {shallow} from 'enzyme'
import {EditableEmail} from './EditableEmail'

describe('<EditableEmail />', () => {
  it('should render provided email', () => {
    const email = 'test'
    const wrapper = shallow(
      <EditableEmail
        email={email}
      />
    )

    expect(wrapper.text()).to.equal(email)
  })
})

