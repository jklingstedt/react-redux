import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Duck } from 'components'
import * as usersLikeActions from 'redux/modules/usersLikes'

class DuckContainer extends Component {
  goToProfile (e) {
    e.stopPropagation()
    this.context.router.push(`/${this.props.duck.uid}`)
  }
  handleClick (e) {
    e.stopPropagation()
    this.context.router.push(`/duckDetail/${this.props.duck.duckId}`)
  }
  render () {
    return (
      <Duck
        goToProfile={(e) => this.goToProfile(e)}
        onClick={this.hideReplyBtn === true ? null : (e) => this.handleClick(e)}
        {...this.props} />
    )
  }
}

const { func, object, bool, number } = PropTypes

DuckContainer.PropTypes = {
  duck: object.isRequired,
  numberOfLikes: number,
  isLiked: bool.isRequired,
  hideReplyBtn: bool.isRequired,
  handleDeleteLike: func.isRequired,
  addHandleLike: func.isRequired,
}

DuckContainer.defaultProps = {
  hideReplyBtn: false,
  hideLikeCount: true,
}

DuckContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

const mapStateToProps = ({ ducks, likeCount, usersLikes }, props) => {
  return {
    duck: ducks[props.duckId],
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn,
    isLiked: usersLikes[props.duckId] === true,
    numberOfLikes: likeCount[props.duckId],
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(usersLikeActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DuckContainer)
