import { saveDuck } from 'helpers/api'
import { closeModal } from './modal'
import { addSingleUsersDuck } from './usersDucks'

const FETCHING_DUCK = 'FETCHING_DUCK'
const ADD_DUCK = 'ADD_DUCK'
const FETCHING_DUCK_SUCCESS = 'FETCHING_DUCK_SUCCESS'
const FETCHING_DUCK_ERROR = 'FETCHING_DUCK_ERROR'
const REMOVE_FETCHING = 'REMOVE_FETCHING'
const ADD_MULTIPLE_DUCKS = 'ADD_MULTIPLE_DUCKS'

export const fetchingDuck = () => {
  return {
    type: FETCHING_DUCK,
  }
}

export const fetchingDuckError = (error) => {
  return {
    type: FETCHING_DUCK_ERROR,
    error: error,
  }
}

export const fetchingDuckSuccess = (duck) => {
  return {
    type: FETCHING_DUCK_SUCCESS,
    duck,
  }
}

export const removeFetching = () => {
  return {
    type: REMOVE_FETCHING,
  }
}

export const addDuck = (duck) => {
  return {
    type: ADD_DUCK,
    duck,
  }
}

export const duckFanOut = (duck) => {
  return (dispatch, getState) => {
    const uid = getState().users.authedId
    saveDuck(duck)
      .then((duckWithId) => {
        dispatch(addDuck(duckWithId))
        dispatch(closeModal())
        dispatch(addSingleUsersDuck(uid, duckWithId.duckId))
      })
      .catch((err) => {
        console.warn('Error in duckFanOut', err)
      })
  }
}

export const addMultipleDucks = (ducks) => {
  return {
    type: ADD_MULTIPLE_DUCKS,
    ducks,
  }
}

const initialState = {
  isFetching: true,
  error: '',
}

export default function ducks (state = initialState, action) {
  switch (action.type) {
    case FETCHING_DUCK :
      return {
        ...state,
        isFetching: true,
      }
    case ADD_DUCK :
    case FETCHING_DUCK_SUCCESS :
      return {
        ...state,
        error: '',
        isFetching: false,
        [action.duck.duckId]: action.duck,
      }
    case FETCHING_DUCK_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case REMOVE_FETCHING :
      return {
        ...state,
        error: '',
        isFetching: false,
      }
    case ADD_MULTIPLE_DUCKS :
      return {
        ...state,
        ...action.ducks,
      }
    default :
      return state
  }
}
