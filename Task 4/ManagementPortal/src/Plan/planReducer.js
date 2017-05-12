import {
    FETCH_PLAN,  FETCH_PLAN_FAILURE,  FETCH_PLAN_SUCCESS,
    FETCH_PLANS, FETCH_PLANS_FAILURE, FETCH_PLANS_SUCCESS
} from "./planActions";
import {
    CREATE_TASK, CREATE_TASK_FAILURE, CREATE_TASK_SUCCESS,
    FETCH_TASK,  FETCH_TASK_FAILURE,  FETCH_TASK_SUCCESS,  RESET_NEW_TASK,
    UPDATE_TASK, UPDATE_TASK_FAILURE, UPDATE_TASK_SUCCESS, RESET_UPDATED_TASK,
    DELETE_TASK, DELETE_TASK_FAILURE, DELETE_TASK_SUCCESS, RESET_DELETED_TASK,
} from "./Task/taskActions";
import Immutable from 'immutable';

function searchNode(plan, nodeId) {
    if (plan) {
        for (var i = 0; i < plan.length; i++) {
            if (plan[i].id === nodeId) {
                return plan[i];
            }
            const node = searchNode(plan[i].nodes, nodeId);
            if (node) {
                return node;
            }
        }
    }
    return null;
}

function setNodeTitle(state, nodeId, title) {
    const plan = state.getIn(['selectedPlan', 'plan', 'plansData']).toJS();
    const node = searchNode(plan, nodeId);
    node.title = title;
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
                            selectedTask:{
                                isFetching: false,
                                task: null,
                                errorMessage: null
                            },
                            newTask:{
                                isFetching: false,
                                success: false,
                                errorMessage: null

                            },
                            updatedTask:{
                                isFetching: false,
                                success: false,
                                errorMessage: null
                            },
                            deletedTask:{
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
        case CREATE_TASK:
            return state.set('newTask', Immutable.fromJS({
                isFetching: true,
                success: false,
                errorMessage: null
            }));
        case CREATE_TASK_SUCCESS:
            newState = addNode(state, action.payload.parent, action.payload);
            return newState.set('newTask', Immutable.fromJS({
                isFetching: false,
                success: true,
                errorMessage: null
            }));
        case CREATE_TASK_FAILURE:
            return state.set('newTask', Immutable.fromJS({
                isFetching: false,
                success: false,
                errorMessage: action.payload,
            }));
        case RESET_NEW_TASK:
            return state.set('newTask', Immutable.fromJS({
                isFetching: false,
                success: false,
                errorMessage: null
            }));
        case UPDATE_TASK:
            return state.set('updatedTask', Immutable.fromJS({
                success: false,
                errorMessage: null,
                isFetching: true
            }));
        case UPDATE_TASK_SUCCESS:
            newState = setNodeTitle(state, action.payload.id, action.payload.title);
            return newState.set('updatedTask', Immutable.fromJS({
                success: true,
                errorMessage: null,
                isFetching: false
            }));
        case UPDATE_TASK_FAILURE:
            return state.set('updatedTask', Immutable.fromJS({
                success: false,
                errorMessage: action.payload,
                isFetching: false
            }));
        case RESET_UPDATED_TASK:
            return state.set('updatedTask', Immutable.fromJS({
                success: false,
                errorMessage: null,
                isFetching: false
            }));
        case DELETE_TASK:
            return state.set('deletedTask', Immutable.fromJS({
                success: false,
                errorMessage: null,
                isFetching: true
            }));
        case DELETE_TASK_SUCCESS:
            newState = deleteNode(state, action.payload);
            return newState.set('deletedTask', Immutable.fromJS({
                success: true,
                errorMessage: null,
                isFetching: false
            }));
        case DELETE_TASK_FAILURE:
            return state.set('deletedTask', Immutable.fromJS({
                success: false,
                errorMessage: action.payload,
                isFetching: false
            }));
        case RESET_DELETED_TASK:
            return state.set('deletedTask', Immutable.fromJS({
                success: false,
                errorMessage: null,
                isFetching: false
            }));
        default:
            return state
    }
}