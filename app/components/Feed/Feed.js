import React, { PropTypes } from 'react'
import { List } from 'immutable'
import { DuckContainer } from 'containers'
import { newDuckContainer, header } from './styles.css'
import { errorMsg } from 'sharedStyles/styles.css'

const { instanceOf, string, bool, func } = PropTypes

const NewDucksAvailable = ({handleClick}) => {
  return (
    <div className={newDuckContainer} onClick={handleClick}>
      {'New Ducks Available'}
    </div>
  )
}

NewDucksAvailable.propTypes = {
  handleClick: PropTypes.func.isRequired,
}

Feed.propTypes = {
  duckIds: instanceOf(List),
  error: string.isRequired,
  isFetching: bool.isRequired,
  newDucksAvailable: bool.isRequired,
  resetNewDucksAvailable: func.isRequired,
}

export default function Feed (props) {
  return props.isFetching === true
    ? <h1 className={header}>{'Fetching'}</h1>
    : <div>
        {props.newDucksAvailable ? <NewDucksAvailable handleClick={props.resetNewDucksAvailable} /> : null}
        {props.duckIds.size === 0
            ? <p className={header}>{'This is unfortunate.'} <br /> {'It appears there are no ducks yet 😞'}</p>
            : null}
        {props.duckIds.map((id) => (
          <DuckContainer
            duckId={id}
            key={id} />
        ))}
        {props.error ? <p className={errorMsg}>{props.error}</p> : null}
      </div>
}
