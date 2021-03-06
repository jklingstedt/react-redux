import React, { PropTypes, Component } from 'react'
import { Navigation } from 'components'
import { connect } from 'react-redux'
import { container, innerContainer } from './styles.css'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import * as usersLikesActionCreators from 'redux/modules/usersLikes'
import { formatUserInfo } from 'helpers/utils'
import { firebaseAuth } from 'config/constants'

const { bool, object, func } = PropTypes

class MainContainer extends Component {
  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
        this.props.authUser(user.uid)
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
        this.props.setUsersLikes()
        if (this.props.location.pathname === '/') {
          this.context.router.replace('feed')
        }
      } else {
        this.props.removeFetchingUser()
      }
    })
  }
  render () {
    return this.props.isFetching === true
    ? null
    : <div className={container}>
        <Navigation isAuthed={this.props.isAuthed}/>
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
  }
}

MainContainer.propTypes = {
  children: object.isRequired,
  isAuthed: bool.isRequired,
  isFetching: bool.isRequired,
  fetchingUserSuccess: func.isRequired,
  removeFetchingUser: func.isRequired,
  setUsersLikes: func.isRequired,
  authUser: func.isRequired,
  location: object.isRequired,
}

MainContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(
  ({users}) => ({ isAuthed: users.isAuthed, isFetching: users.isFetching }),
  (dispatch) => bindActionCreators({
    ...userActionCreators,
    ...usersLikesActionCreators,
  }, dispatch)
)(MainContainer)
