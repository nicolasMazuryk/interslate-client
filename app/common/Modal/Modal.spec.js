import React from 'react'
import {shallow} from 'enzyme'
import Modal from 'common/Modal/Modal'
import sinon from 'sinon'

describe('<Modal />', () => {

  let wrapper, title, opened,
    onClose, onSubmit, child

  before(() => {
    title = 'Title'
    opened = true
    onSubmit = sinon.spy()
    onClose = sinon.spy()
    child = <div className="modal-child" />
    wrapper = shallow(
      <Modal
        title={title}
        opened={opened}
        onClose={onClose}
        onSubmit={onSubmit}
      >
        {child}
      </Modal>
    )
  })

  beforeEach(() => {
    onClose.reset()
  })

  it('should render active modal', () => {
    expect(wrapper.find('.modal.is-active')).to.have.length(1)
  })

  it('should render header with title', () => {
    expect(wrapper.find('.modal-card-title').text()).to.equal(title)
  })

  it('should close modal when delete button is clicked', () => {
    wrapper.find('button.delete').simulate('click')
    expect(onClose.calledOnce).to.be.true
  })

  it('should put children in card body', () => {
    expect(wrapper.find('.modal-card-body').containsMatchingElement(child)).to.be.true
  })

  it('should call onSubmit when save button is clicked', () => {
    wrapper.find('[name="save"]').simulate('click')
    expect(onSubmit.calledOnce).to.be.true
  })

  it('should call onClose when close button is clicked', () => {
    wrapper.find('[name="close"]').simulate('click')
    expect(onSubmit.calledOnce).to.be.true
  })

})