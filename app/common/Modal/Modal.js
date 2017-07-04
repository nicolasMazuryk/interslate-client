import React from 'react'
import PropTypes from 'prop-types'

const Modal = (props) => {
  const {
    title,
    opened,
    onClose,
    onSubmit,
    children
  } = props

  return (
    <div className={`modal ${opened ? 'is-active' : ''}`}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button onClick={onClose} className="delete" />
        </header>
        <section className="modal-card-body">
          {children}
        </section>
        <footer className="modal-card-foot" style={{justifyContent: 'flex-end'}}>
          <button
            onClick={onClose}
            className="button"
            name="close"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="button is-success"
            name="save"
            onClick={onSubmit}
          >
            Save
          </button>
        </footer>
      </div>
    </div>
  )
}

Modal.propTypes = {
  opened: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.object
}

export default Modal
