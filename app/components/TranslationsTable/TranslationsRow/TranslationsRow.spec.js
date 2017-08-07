import React from 'react'
import {mount} from 'enzyme'
import sinon from 'sinon'
import TranslationsRow from './TranslationsRow'
import EditableKey from 'components/TranslationsTable/EditableKey/EditableKey'
import EditableTranslation from 'components/TranslationsTable/EditableTranslation/EditableTranslation'

describe('<TranslationsRow />', () => {
  let wrapper, _id, tKey,
    translation, onRemove,
    onUpdate, isSelected,
    onCheckboxClick, group

  before(() => {
    _id = 'id'
    tKey = 'key'
    group = 'group'
    isSelected = true
    translation = 'translation'
    onRemove = sinon.spy()
    onUpdate = sinon.spy()
    onCheckboxClick = sinon.spy()
    wrapper = mount(
      <table>
        <tbody>
          <TranslationsRow
            _id={_id}
            tKey={tKey}
            group={group}
            translation={translation}
            isSelected={isSelected}
            onCheckboxClick={onCheckboxClick}
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

  it('should render proper translation group', () => {
    expect(wrapper.find('td').at(3).text()).to.equal(group)
  })

  it('should be checked', () => {
    expect(wrapper.find('input[type="checkbox"]').prop('checked')).to.be.true
  })

  it('should contain selected properties', () => {
    const selectedStyle = {backgroundColor: '#ededed'}
    expect(wrapper.find('tr').prop('style')).to.deep.equal(selectedStyle)
  })

  it('should call onCheckboxClick callback with _id', () => {
    wrapper.find('input[type="checkbox"]').simulate('click')
    expect(onCheckboxClick.calledWith(_id)).to.be.true
  })

  it('should call onRemove callback', () => {
    wrapper.find('button.delete').simulate('click')
    expect(onRemove.calledOnce).to.be.true
  })
})
