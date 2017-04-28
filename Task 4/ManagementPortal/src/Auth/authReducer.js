import Cookies from 'js-cookie';
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE
} from './authActions'
import {verifyToken} from "../fakeBackend";
import Immutable from 'immutable';


export default function(state = Immutable.fromJS({
                            errorMessage: null,
                            isFetching: false,
                            user: verifyToken(Cookies.get('id_token'))
                        }), action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Immutable.fromJS({
                errorMessage: null,
                isFetching: true,
                user: null
            });
        case LOGIN_SUCCESS:
            return Immutable.fromJS({
                errorMessage: null,
                isFetching: false,
                user: action.payload
            });
        case LOGIN_FAILURE:
            return Immutable.fromJS({
                errorMessage: action.payload,
                isFetching: false,
                user: null
            });
        case LOGOUT_REQUEST:
            return state.set('isFetching', true);
        case LOGOUT_SUCCESS:
            return Immutable.fromJS({
                errorMessage: null,
                isFetching: false,
                user: null
            });
        case LOGOUT_FAILURE:
            return Immutable.fromJS({
                errorMessage: null,
                isFetching: false,
                user: null
            });
        default:
            return state
    }
}