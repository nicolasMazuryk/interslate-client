import React from 'react'
import {shallow} from 'enzyme'
import {Translation} from './EditableTranslation'

describe('<EditableKey />', () => {

  it('should render provided translation', () => {
    const translation = 'test'
    const wrapper = shallow(
      <Translation
        translation={translation}
      />
    )
    expect(wrapper.text()).to.equal(translation)
  })

})