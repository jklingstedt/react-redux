import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DuckDetails } from 'components'
import * as duckActionCreators from 'redux/modules/ducks'
import * as likeCountActionCreators from 'redux/modules/likeCount'
import * as repliesActionCreators from 'redux/modules/replies'
const { func, object, string, bool } = PropTypes

class DuckDetailsContainer extends Component {
  componentDidMount () {
    this.props.initLikeFetch(this.props.duckId)
    if (this.props.duckAlreadyFetched === false) {
      this.props.fetchAndHandleDuck(this.props.duckId)
    } else {
      this.props.removeFetching()
    }
  }
  render () {
    return (
      <DuckDetails
        duckId={this.props.duckId}
        isFetching={this.props.isFetching}
        authedUser={this.props.authedUser}
        error={this.props.error}
        addAndHandleReply={this.props.addAndHandleReply}/>
    )
  }
}

DuckDetailsContainer.propTypes = {
  isFetching: bool.isRequired,
  error: string.isRequired,
  authedUser: object.isRequired,
  duckId: string.isRequired,
  duckAlreadyFetched: bool.isRequired,
  initLikeFetch: func.isRequired,
  removeFetching: func.isRequired,
  fetchAndHandleDuck: func.isRequired,
  addAndHandleReply: func.isRequired,
}

function mapStateToProps ({ducks, likeCount, users}, props) {
  return {
    isFetching: ducks.get('isFetching') || likeCount.isFetching,
    error: ducks.get('error'),
    authedUser: users[users.authedId].info,
    duckId: props.routeParams.duckId,
    duckAlreadyFetched: !!ducks.get(props.routeParams.duckId),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...duckActionCreators,
    ...likeCountActionCreators,
    ...repliesActionCreators,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DuckDetailsContainer)
