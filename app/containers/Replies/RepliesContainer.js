import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Replies } from 'components'
import { bindActionCreators } from 'redux'
import * as repliesActionCreators from 'redux/modules/replies'
import { staleReplies } from 'helpers/utils'
const { bool, string, number, func, object } = PropTypes

class RepliesContainer extends Component {
  componentDidMount () {
    if (staleReplies(this.props.lastUpdated)) {
      this.props.fetchAndHandleReplies(this.props.duckId)
    }
  }
  render () {
    return (
      <Replies
        isFetching={this.props.isFetching}
        error={this.props.error}
        lastUpdated={this.props.lastUpdated}
        replies={this.props.replies} />
    )
  }
}

RepliesContainer.defaultProps = {
  lastUpdated: 0,
  replies: {},
}

RepliesContainer.propTypes = {
  isFetching: bool.isRequired,
  error: string.isRequired,
  lastUpdated: number.isRequired,
  replies: object.isRequired,
  duckId: string.isRequired,
  fetchAndHandleReplies: func.isRequired,
}

const mapStateToProps = (state, props) => {
  const duckRepliesInfo = state.replies[props.duckId] || {}
  const { lastUpdated, replies } = duckRepliesInfo
  return {
    isFetching: state.replies.isFetching,
    error: state.replies.error,
    lastUpdated,
    replies,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(repliesActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RepliesContainer)
