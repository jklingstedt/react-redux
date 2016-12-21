// Users
function user(state = initialUserState, action) {
    switch (action.type) {
        case FETCHING_USER_SUCCESS:
            return {
                ...state,
                info: action.user,
                lastUpdated: action.timestamp,
            }
        default:
            return state
    }
}

function users (state, action) {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                isAuthed: true,
                authedId: action.uid
            }
        case UNAUTH_USER:
            return  {
                ...state,
                isAuthed: false,
                authedId: ''
            }

        case FETCHING_USER:
            return  {
                ...state,
                isFetching: true
            }

        case FETCHING_USER_FAILURE:
            return  {
                ...state,
                isFetching: false,
                error: action.error
            }

        case FETCHING_USER_SUCCESS:
            return action.user === null
                ? {
                    ...state,
                    isFetching: false,
                    error: '',
                }
                : {
                    ...state,
                    isFetching: false,
                    error: '',
                    [action.uid]: user(state[action.uid], action),

        default :
            return state
    }
}