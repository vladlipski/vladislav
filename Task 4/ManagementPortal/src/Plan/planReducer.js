import {
    FETCH_PLAN, FETCH_PLAN_FAILURE, FETCH_PLAN_SUCCESS,
    FETCH_PLANS, FETCH_PLANS_FAILURE, FETCH_PLANS_SUCCESS
} from "./planActions";
import {
    FETCH_TASK, FETCH_TASK_FAILURE, FETCH_TASK_SUCCESS
} from "./Task/taskActions";
import Immutable from 'immutable';


export default function(state = Immutable.fromJS({
                            plansList: {
                                isFetching: false,
                                plans: [],
                                errorMessage: null
                            },
                            selectedPlan:{
                                isFetching: false,
                                plan: null,
                                errorMessage: null
                            },
                            selectedTask:{
                                isFetching: false,
                                task: null,
                                errorMessage: null
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
                plan: null,
                errorMessage: null
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
        case FETCH_TASK:
            return state.set('selectedTask', Immutable.fromJS({
                isFetching: true,
                task: null,
                errorMessage: null
            }));
        case FETCH_TASK_SUCCESS:
            return  state.set('selectedTask', Immutable.fromJS({
                isFetching: false,
                task: action.payload,
                errorMessage: null
            }));
        case FETCH_TASK_FAILURE:
            return state.set('selectedTask', Immutable.fromJS({
                isFetching: false,
                task: null,
                errorMessage: action.payload
            }));
        default:
            return state
    }
}