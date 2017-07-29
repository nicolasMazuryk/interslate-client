import React from 'react'
import {mount} from 'enzyme'
import LoginWithServices from 'containers/Auth/LoginWithServices/LoginWithServices'

describe('<LoginWithServices />', () => {
  let wrapper, text

  before(() => {
    text = 'to'
    wrapper = mount(
      <LoginWithServices text={text} />
    )
  })

  it('should render link to google auth for dev', () => {
    expect(wrapper.find('a').prop('href')).to.equal('http://127.0.0.1:9090/auth/google')
  })
})
