import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Duck } from 'components'

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
        goToProfle={this.goToProfile}
        onClick={this.hideReplyBtn === true ? null : this.handleClick}
        {...this.props} />
    )
  }
}

const { string, func, object, bool, array, number } = PropTypes

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

export default connect(mapStateToProps)(DuckContainer)
