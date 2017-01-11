import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
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

FeedContainer.PropTypes = {
  newDucksAvailable: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  setAndHandleFeedListener: PropTypes.func.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired,
  duckIds: PropTypes.array.isRequired,
}

const mapStateToProps = ({ feed }) => {
  const { newDucksAvailable, error, isFetching, duckIds } = feed
  return {
    newDucksAvailable,
    error,
    isFetching,
    duckIds,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(feedActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedContainer)
