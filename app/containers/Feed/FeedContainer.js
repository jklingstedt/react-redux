import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { List } from 'immutable'
import { Feed } from 'components'
import * as feedActionCreators from 'redux/modules/feed'

class FeedContainer extends Component {
  componentDidMount = () => {
    this.props.setAndHandleFeedListener()
  }
  render () {
    return (
      <Feed
        newDucksAvailable={this.props.newDucksAvailable}
        error={this.props.error}
        isFetching={this.props.isFetching}
        resetNewDucksAvailable={this.props.resetNewDucksAvailable}
        duckIds={this.props.duckIds} />
    )
  }
}

FeedContainer.propTypes = {
  newDucksAvailable: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  setAndHandleFeedListener: PropTypes.func.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired,
  duckIds: PropTypes.instanceOf(List),
}

const mapStateToProps = ({ feed }) => {
  return {
    newDucksAvailable: feed.get('newDucksAvailable'),
    error: feed.get('error'),
    isFetching: feed.get('isFetching'),
    duckIds: feed.get('duckIds'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(feedActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedContainer)
