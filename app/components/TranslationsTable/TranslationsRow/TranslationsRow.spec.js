import React from 'react'
import {mount} from 'enzyme'
import sinon from 'sinon'
import TranslationsRow from './TranslationsRow'
import EditableKey from 'components/TranslationsTable/EditableKey/EditableKey'
import EditableTranslation from 'components/TranslationsTable/EditableTranslation/EditableTranslation'

describe('<TranslationsRow />', () => {
  let wrapper, _id, tKey,
    translation, onRemove,
    onUpdate

  before(() => {
    _id = 'id'
    tKey = 'key'
    translation = 'translation'
    onRemove = sinon.spy()
    onUpdate = sinon.spy()
    wrapper = mount(
      <table>
        <tbody>
          <TranslationsRow
            _id={_id}
            tKey={tKey}
            translation={translation}
            onRemove={onRemove}
            onUpdate={onUpdate}
          />
        </tbody>
      </table>
    )
  })

  it('should render editable translation key', () => {
    expect(wrapper.find(EditableKey)).to.have.length(1)
  })

  it('should render editable translation value', () => {
    expect(wrapper.find(EditableTranslation)).to.have.length(1)
  })

  it('should call onRemove callback', () => {
    wrapper.find('button.delete').simulate('click')
    expect(onRemove.calledOnce).to.be.true
  })
})
