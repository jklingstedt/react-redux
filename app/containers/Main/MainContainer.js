import React, { PropTypes, Component } from 'react'
import { Navigation } from 'components'
import { connect } from 'react-redux'
import { container, innerContainer } from './styles.css'

class MainContainer extends Component {
  render () {
    return (
      <div className={container}>
        <Navigation isAuthed={this.props.isAuthed}/>
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

MainContainer.PropTypes = {
  children: PropTypes.object.isRequired,
  isAuthed: PropTypes.bool.isRequired,
}

export default connect(
  (state) => ({ isAuthed: state.isAuthed })
)(MainContainer)
