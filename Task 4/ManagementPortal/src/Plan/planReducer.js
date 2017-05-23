import {
    CREATE_PLAN, CREATE_PLAN_FAILURE, CREATE_PLAN_SUCCESS,
    DELETE_PLAN, DELETE_PLAN_FAILURE, DELETE_PLAN_SUCCESS,
    FETCH_PLAN,  FETCH_PLAN_FAILURE,  FETCH_PLAN_SUCCESS,
    FETCH_PLANS, FETCH_PLANS_FAILURE, FETCH_PLANS_SUCCESS,
    RESET_EDITED_PLAN,
    UPDATE_PLAN, UPDATE_PLAN_FAILURE, UPDATE_PLAN_SUCCESS
} from "./planActions";
import {
    CREATE_TASK, CREATE_TASK_FAILURE, CREATE_TASK_SUCCESS,
    FETCH_TASK,  FETCH_TASK_FAILURE,  FETCH_TASK_SUCCESS,  RESET_EDITED_TASK,
    UPDATE_TASK, UPDATE_TASK_FAILURE, UPDATE_TASK_SUCCESS,
    DELETE_TASK, DELETE_TASK_FAILURE, DELETE_TASK_SUCCESS,
} from "./Task/taskActions";
import Immutable from 'immutable';
import {searchNode} from "../Shared/utils";


function addTaskToNode(state, task) {
    const plan = state.getIn(['selectedPlan', 'plan', 'plansData']).toJS();
    const node = searchNode(plan, task.id);
    Object.assign(node, task, {isLoaded: true});
    return state.setIn(['selectedPlan', 'plan', 'plansData'], Immutable.fromJS(plan));
}

function updateNode(state, task) {
    const plan = state.getIn(['selectedPlan', 'plan', 'plansData']).toJS();
    const node = searchNode(plan, task.id);
    Object.assign(node, task);
    return state.setIn(['selectedPlan', 'plan', 'plansData'], Immutable.fromJS(plan));
}

function addNode(state, parentNodeId, newNode) {
    const plan = state.getIn(['selectedPlan', 'plan', 'plansData']).toJS();
    if (parentNodeId) {
        const node = searchNode(plan, parentNodeId);
        node.nodes ? node.nodes.push(newNode) : node.nodes = [newNode];
    } else {
        plan.push(newNode);
    }
    return state.setIn(['selectedPlan', 'plan', 'plansData'], Immutable.fromJS(plan));
}

function deleteNode(state, nodeId) {
    const plan = state.getIn(['selectedPlan', 'plan', 'plansData']).toJS();
    var res = plan.filter(function f(task) {
        if (task.id == nodeId) {
            return false
        }
        if (task.nodes) {
            task.nodes = task.nodes.filter(f);
        }
        return true;
    });
    return state.setIn(['selectedPlan', 'plan', 'plansData'], Immutable.fromJS(res));
}

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
                            editedPlan:{
                                success: false,
                                plan: null,
                                errorMessage: null,
                                isFetching: false
                            },
                            selectedTask:{
                                isFetching: false,
                                errorMessage: null
                            },
                            editedTask:{
                                isFetching: false,
                                success: false,
                                errorMessage: null
                            }
                        }), action) {
    var newState;
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
                plans: action.payload
            }));
        case FETCH_PLANS_FAILURE:
            return state.set('plansList', Immutable.fromJS({
                isFetching: false,
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
                plan: action.payload
            }));
        case FETCH_PLAN_FAILURE:
            return state.set('selectedPlan', Immutable.fromJS({
                isFetching: false,
                errorMessage: action.payload
            }));
        case CREATE_PLAN:
            return state.set('editedPlan', Immutable.fromJS({
                isFetching: true
            }));
        case CREATE_PLAN_SUCCESS:
            return state.set('editedPlan', Immutable.fromJS({
                plan: action.payload,
                isFetching: false
            }));
        case CREATE_PLAN_FAILURE:
            return state.set('editedPlan', Immutable.fromJS({
                errorMessage: action.payload,
                isFetching: false
            }));
        case RESET_EDITED_PLAN:
            return state.set('editedPlan', Immutable.fromJS({
                plan: null,
                errorMessage: null,
                isFetching: false
            }));
        case UPDATE_PLAN:
            return state.set('editedPlan', Immutable.fromJS({
                isFetching: true
            }));
        case UPDATE_PLAN_SUCCESS:
            return state.set('editedPlan', Immutable.fromJS({
                success: true,
                isFetching: false
            }));
        case UPDATE_PLAN_FAILURE:
            return state.set('editedPlan', Immutable.fromJS({
                errorMessage: action.payload,
                isFetching: false
            }));
        case DELETE_PLAN:
            return state.set('editedPlan', Immutable.fromJS({
                isFetching: true
            }));
        case DELETE_PLAN_SUCCESS:
            return state.set('editedPlan', Immutable.fromJS({
                success: true,
                isFetching: false
            }));
        case DELETE_PLAN_FAILURE:
            return state.set('editedPlan', Immutable.fromJS({
                errorMessage: action.payload,
                isFetching: false
            }));
        case FETCH_TASK:
            return state.set('selectedTask', Immutable.fromJS({
                isFetching: true,
                errorMessage: null
            }));
        case FETCH_TASK_SUCCESS:
            newState = addTaskToNode(state, action.payload);
            return  newState.set('selectedTask', Immutable.fromJS({
                isFetching: false,
                task: action.payload
            }));
        case FETCH_TASK_FAILURE:
            return state.set('selectedTask', Immutable.fromJS({
                isFetching: false,
                errorMessage: action.payload
            }));
        case CREATE_TASK:
            return state.set('editedTask', Immutable.fromJS({
                isFetching: true
            }));
        case CREATE_TASK_SUCCESS:
            newState = addNode(state, action.payload.parent, action.payload);
            return newState.set('editedTask', Immutable.fromJS({
                isFetching: false,
                success: true
            }));
        case CREATE_TASK_FAILURE:
            return state.set('editedTask', Immutable.fromJS({
                isFetching: false,
                errorMessage: action.payload,
            }));
        case RESET_EDITED_TASK:
            return state.set('editedTask', Immutable.fromJS({
                isFetching: false,
                success: false,
                errorMessage: null
            }));
        case UPDATE_TASK:
            return state.set('editedTask', Immutable.fromJS({
                isFetching: true
            }));
        case UPDATE_TASK_SUCCESS:
            newState = updateNode(state, action.payload);
            return newState.set('editedTask', Immutable.fromJS({
                success: true,
                isFetching: false
            }));
        case UPDATE_TASK_FAILURE:
            return state.set('editedTask', Immutable.fromJS({
                errorMessage: action.payload,
                isFetching: false
            }));
        case DELETE_TASK:
            return state.set('editedTask', Immutable.fromJS({
                isFetching: true
            }));
        case DELETE_TASK_SUCCESS:
            newState = deleteNode(state, action.payload);
            return newState.set('editedTask', Immutable.fromJS({
                success: true,
                isFetching: false
            }));
        case DELETE_TASK_FAILURE:
            return state.set('editedTask', Immutable.fromJS({
                errorMessage: action.payload,
                isFetching: false
            }));
        default:
            return state
    }
}