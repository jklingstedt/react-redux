import React, {PropTypes} from 'react'
import { DuckContainer } from 'containers'
import { formatReply } from 'helpers/utils'
import { mainContainer, container, content, repliesContainer, replyTextAreaContainer, replyTextArea } from './styles.css'
import { subHeader, darkBtn, errorMsg } from 'sharedStyles/styles.css'

const {string, bool, object, func} = PropTypes

const Reply = ({submit}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    if (Reply.ref.value.length === 0) {
      return
    }
    submit(Reply.ref.value, e)
    Reply.ref.value = ''
  }
  return (
    <div className={replyTextAreaContainer}>
      <textarea
        ref={(ref) => (Reply.ref = ref)}
        className={replyTextArea}
        maxLength={140}
        placeholder='Your reply'
        type='text' />
      <button onClick={(e) => handleSubmit(e)} className={darkBtn}>{'Reply'}</button>
    </div>
  )
}

const DuckDetails = ({ duckId, isFetching, authedUser, error, addAndHandleReply }) => {
  return (
    <div className={mainContainer}>
      {isFetching === true
        ? <p className={subHeader}>{'Fetching'}</p>
        : <div className={container}>
            <div className={content}>
              <DuckContainer duckId={duckId} hideLikeCount={false} hideReplyBtn={true} />
              <Reply submit={(replyText) => addAndHandleReply(duckId, formatReply(authedUser, replyText))}/>
            </div>
            <div className={repliesContainer}>
              {'REPLY SECTION'}
            </div>
          </div>}
      {error ? <p className={errorMsg}>{error}</p> : null}
    </div>
  )
}

DuckDetails.propTypes = {
  duckId: string.isRequired,
  isFetching: bool.isRequired,
  authedUser: object.isRequired,
  error: string.isRequired,
  addAndHandleReply: func.isRequired,
}

export default DuckDetails
