import {
    FETCH_PLANS, FETCH_PLANS_FAILURE, FETCH_PLANS_SUCCESS
} from "./planActions";
import Immutable from 'immutable';


export default function(state = Immutable.fromJS({
                            plansList: {
                                plans: [],
                                errorMessage: null,
                                isFetching: false
                            }
                        }), action) {
    switch (action.type) {
        case FETCH_PLANS:
            return state.set('plansList', Immutable.fromJS({
                isFetching: true,
                plans: [],
                errorMessage: null
            }));
        case FETCH_PLANS_SUCCESS:
            return state.set('plansList', Immutable.fromJS({
                isFetching: false,
                plans: action.payload,
                errorMessage: null
            }));
        case FETCH_PLANS_FAILURE:
            return state.set('plansList', Immutable.fromJS({
                isFetching: false,
                plans: [],
                errorMessage: action.payload
            }));
        default:
            return state
    }
}