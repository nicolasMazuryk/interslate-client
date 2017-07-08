import React from 'react'
import {mount} from 'enzyme'
import PrivateRoute from './PrivateRoute'
import {MemoryRouter, Redirect} from 'react-router-dom'

describe('<PrivateRoute />', () => {
  let wrapper, user,
    dummyProp, location

  function Test() {
    return <div className="test">test</div>
  }

  before(() => {
    location = {}
  })

  it('should return component with componentProps passed in PrivateRoute', () => {
    user = {
      email: 'test',
      uploadToken: 'token'
    }
    wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          component={Test}
          componentProps={{user}}
          dummyProp={dummyProp}
          location={location}
        />
      </MemoryRouter>
    )
    expect(wrapper.find(Test).prop('user')).to.deep.equal(user)
  })

  it('should return Redirect component', () => {
    user = null
    wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          component={Test}
          componentProps={{user}}
          dummyProp={dummyProp}
          location={location}
        />
      </MemoryRouter>
    )
    const expected = {
      pathname: '/enter',
      state: {
        from: location
      }
    }

    expect(wrapper.find(Redirect).prop('to')).to.deep.equal(expected)
  })
})
