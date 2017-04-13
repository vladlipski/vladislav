import {
    FETCH_PLANS, FETCH_PLANS_FAILURE, FETCH_PLANS_SUCCESS
} from "./planActions";

export default function(state = {
                            plansList: {
                                plans: [],
                                errorMessage: null,
                                isFetching: false
                            }
                        }, action) {
    switch (action.type) {
        case FETCH_PLANS:
            return Object.assign({}, state, {
                plansList: {
                    isFetching: true,
                    plans: []
                }
            });
        case FETCH_PLANS_SUCCESS:
            return Object.assign({}, state, {
                plansList: {
                    isFetching: false,
                    plans: action.payload,
                    errorMessage: ''
                }
            });
        case FETCH_PLANS_FAILURE:
            return Object.assign({}, state, {
                plansList: {
                    isFetching: false,
                    plans: [],
                    errorMessage: action.payload
                }
            });
        default:
            return state
    }
}