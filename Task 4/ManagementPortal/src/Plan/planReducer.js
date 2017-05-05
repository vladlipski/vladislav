import {
    FETCH_PLAN, FETCH_PLAN_FAILURE, FETCH_PLAN_SUCCESS,
    FETCH_PLANS, FETCH_PLANS_FAILURE, FETCH_PLANS_SUCCESS, RESET_SELECTED_PLAN
} from "./planActions";
import Immutable from 'immutable';


export default function(state = Immutable.fromJS({
                            plansList: {
                                plans: [],
                                errorMessage: null,
                                isFetching: false
                            },
                            selectedPlan:{
                                plan: null,
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
        case FETCH_PLAN:
            return state.set('selectedPlan', Immutable.fromJS({
                isFetching: true,
                plan: null
            }));
        case FETCH_PLAN_SUCCESS:
            return  state.set('selectedPlan', Immutable.fromJS({
                isFetching: false,
                plan: action.payload,
                errorMessage: null
            }));
        case FETCH_PLAN_FAILURE:
            return state.set('selectedPlan', Immutable.fromJS({
                isFetching: false,
                plan: null,
                errorMessage: action.payload
            }));
        case RESET_SELECTED_PLAN:
            return  state.set('selectedPlan', Immutable.fromJS({
                isFetching: false,
                plan: {},
                errorMessage: null
            }));
        default:
            return state
    }
}