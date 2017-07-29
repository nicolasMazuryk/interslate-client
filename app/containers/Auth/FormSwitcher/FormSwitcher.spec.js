import React from 'react'
import {mount} from 'enzyme'
import FormSwitcher from 'containers/Auth/FormSwitcher/FormSwitcher'
import {Link, MemoryRouter} from 'react-router-dom'

describe('<FormSwitcher />', () => {
  let wrapper

  before(() => {
    const pathname = '/enter/login'
    wrapper = mount(
      <MemoryRouter>
        <FormSwitcher pathname={pathname} />
      </MemoryRouter>
    )
  })

  it('should render text "Don\'t have an account?"', () => {
    const pathname = '/enter/login'
    wrapper = mount(
      <MemoryRouter>
        <FormSwitcher pathname={pathname} />
      </MemoryRouter>
    )
    expect(wrapper.find('.level-item span').text()).to.equal('Don\'t have an account?')
  })

  it('should have link to register form', () => {
    const pathname = '/enter/login'
    wrapper = mount(
      <MemoryRouter>
        <FormSwitcher pathname={pathname} />
      </MemoryRouter>
    )
    expect(wrapper.find(Link).prop('to')).to.equal('/enter/register')
  })

  it('should render text "I have an account."', () => {
    const pathname = '/enter/register'
    wrapper = mount(
      <MemoryRouter>
        <FormSwitcher pathname={pathname} />
      </MemoryRouter>
    )
    expect(wrapper.find('.level-item span').text()).to.equal('I have an account.')
  })

  it('should have link to login form', () => {
    const pathname = '/enter/register'
    wrapper = mount(
      <MemoryRouter>
        <FormSwitcher pathname={pathname} />
      </MemoryRouter>
    )
    expect(wrapper.find(Link).prop('to')).to.equal('/enter/login')
  })

  it('should render text "I remember my password."', () => {
    const pathname = '/enter/recover'
    wrapper = mount(
      <MemoryRouter>
        <FormSwitcher pathname={pathname} />
      </MemoryRouter>
    )
    expect(wrapper.find('.level-item span').text()).to.equal('I remember my password.')
  })

  it('should have link to login form', () => {
    const pathname = '/enter/recover'
    wrapper = mount(
      <MemoryRouter>
        <FormSwitcher pathname={pathname} />
      </MemoryRouter>
    )
    expect(wrapper.find(Link).prop('to')).to.equal('/enter/login')
  })
})
