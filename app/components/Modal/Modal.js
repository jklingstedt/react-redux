import React, { PropTypes } from 'react'
import { default as ReactModal } from 'react-modal'
import { formatDuck } from 'helpers/utils'
import {
  newDuckTop, pointer, newDuckInputContainer,
  newDuckInput, submitDuckBtn, darkBtn } from './styles.css'

const modalStyles = {
  content: {
    width: 350,
    margin: '0px auto',
    height: 220,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0,
  },
}

const Modal = (props) => {
  const submitDuck = () => {
    props.duckFanOut(formatDuck(props.duckText, props.user))
  }
  return (
    <span className={darkBtn} onClick={props.openModal}>
      {'Duck'}
      <ReactModal
        style={modalStyles}
        isOpen={props.isOpen}
        onRequestClose={props.closeModal}
        contentLabel='fix' >
        <div className={newDuckTop}>
          <span>{'Compose new Duck'}</span>
          <span onClick={props.closeModal} className={pointer}>{'X'}</span>
        </div>
        <div className={newDuckInputContainer}>
          <textarea
            onChange={(e) => props.updateDuckText(e.target.value)}
            value={props.duckText}
            maxLength={140}
            type='text'
            className={newDuckInput}
            placeholder="What's on your mind?" />
        </div>
        <button
          className={submitDuckBtn}
          disabled={props.isSubmitDisabled}
          onClick={submitDuck}>
            {'Duck'}
        </button>
      </ReactModal>
    </span>
  )
}

const { object, string, func, bool } = PropTypes

Modal.propTypes = {
  duckText: string.isRequired,
  isOpen: bool.isRequired,
  user: object.isRequired,
  isSubmitDisabled: bool.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
  updateDuckText: func.isRequired,
  duckFanOut: func.isRequired,
}

export default Modal
