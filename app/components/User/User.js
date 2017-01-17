import React, { PropTypes } from 'react'
import { DuckContainer } from 'containers'
import { userContainer, header } from './styles.css'
import { errorMsg } from 'sharedStyles/styles.css'

const User = (props) => {
  return props.noUser === true
    ? <p className={header}>{'This user doesn\'t exist. 👽'}</p>
    : <div>
        {props.isFetching === true
          ? <p className={header}>{'Loading'}</p>
          : <div>
              <div className={userContainer}>
                <div>{props.name}</div>
              </div>
              {props.duckIds.map((id) => (
                <DuckContainer
                  duckId={id}
                  key={id} />
              ))}
              {props.duckIds.size === 0
                ? <p className={header}>
                    {`It looks like ${props.name.split(' ')[0]} hasn't made any ducks yet.`}
                  </p>
                : null}
            </div>}
        {props.error ? <p className={errorMsg}>{props.error}</p> : null}
      </div>
}

const { bool, string, array } = PropTypes

User.propTypes = {
  noUser: bool.isRequired,
  name: string.isRequired,
  isFetching: bool.isRequired,
  error: string.isRequired,
  duckIds: array.isRequired,
}

export default User
