
import UserActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    err: null
}



const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                err: null
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                err: null
            }
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                err: action.payload
            }

        default:
            return state;
    }
}
export default userReducer;