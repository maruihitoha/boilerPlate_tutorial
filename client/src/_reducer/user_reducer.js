import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
                                            // user_action의 페이로드
            return {...state, loginSuccess : action.payload }
        
        case REGISTER_USER:
            return { ...state, register: action.payload}

        case AUTH_USER:
            return { ...state, register: action.payload}
        
        default:
            return state;

    }
}