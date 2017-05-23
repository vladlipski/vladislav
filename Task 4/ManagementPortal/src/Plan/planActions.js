import * as fakeBackend from "../fakeBackend";
export const FETCH_PLANS = 'FETCH_PLANS';
export const FETCH_PLANS_SUCCESS = 'FETCH_PLANS_SUCCESS';
export const FETCH_PLANS_FAILURE = 'FETCH_PLANS_FAILURE';

export const FETCH_PLAN = 'FETCH_PLAN';
export const FETCH_PLAN_SUCCESS = 'FETCH_PLAN_SUCCESS';
export const FETCH_PLAN_FAILURE = 'FETCH_PLAN_FAILURE';

export const RESET_EDITED_PLAN = 'RESET_EDITED_PLAN';

export const CREATE_PLAN = 'CREATE_PLAN';
export const CREATE_PLAN_SUCCESS = 'CREATE_PLAN_SUCCESS';
export const CREATE_PLAN_FAILURE = 'CREATE_PLAN_FAILURE';

export const UPDATE_PLAN = 'UPDATE_PLAN';
export const UPDATE_PLAN_SUCCESS = 'UPDATE_PLAN_SUCCESS';
export const UPDATE_PLAN_FAILURE = 'UPDATE_PLAN_FAILURE';

export const DELETE_PLAN = 'DELETE_PLAN';
export const DELETE_PLAN_SUCCESS = 'DELETE_PLAN_SUCCESS';
export const DELETE_PLAN_FAILURE = 'DELETE_PLAN_FAILURE';


export function fetchPlans() {
    return {
        type: FETCH_PLANS
    };
}

export function fetchPlansSuccess(plans) {
    return {
        type: FETCH_PLANS_SUCCESS,
        payload: plans
    };
}

export function fetchPlansFailure(message) {
    return {
        type: FETCH_PLANS_FAILURE,
        payload: message
    };
}

export function getAllPlans() {
    return (dispatch) => {
        dispatch(fetchPlans());
        return fakeBackend.getAllPlans().then(response => {
            dispatch(fetchPlansSuccess(response.plans));
        }).catch(response => {
            dispatch(fetchPlansFailure(response.errorMessage));
        })
    }
}

export function getPlansByAuthor(authorId) {
    return (dispatch) => {
        dispatch(fetchPlans());
        return fakeBackend.getPlansByAuthor(authorId).then(response => {
            dispatch(fetchPlansSuccess(response.plans));
        }).catch(response => {
            dispatch(fetchPlansFailure(response.errorMessage));
        })
    }
}

export function fetchPlan() {
    return {
        type: FETCH_PLAN
    };
}

export function fetchPlanSuccess(plan) {
    return {
        type: FETCH_PLAN_SUCCESS,
        payload: plan
    };
}

export function fetchPlanFailure(message) {
    return {
        type: FETCH_PLAN_FAILURE,
        payload: message
    };
}

export function getPlan(authorId, planId) {
    return (dispatch) => {
        dispatch(fetchPlan());
        return fakeBackend.getPlan(authorId, planId).then(response => {
            dispatch(fetchPlanSuccess(response.plan));
        }).catch(response => {
            dispatch(fetchPlanFailure(response.errorMessage));
        })
    }
}

export function createPlan() {
    return {
        type: CREATE_PLAN
    };
}

export function createPlanSuccess(plan) {
    return {
        type: CREATE_PLAN_SUCCESS,
        payload: plan
    };
}

export function createPlanFailure(message) {
    return {
        type: CREATE_PLAN_FAILURE,
        payload: message
    };
}

export function resetEditedPlan() {
    return {
        type: RESET_EDITED_PLAN
    };
}

export function requestPlanCreation(plan) {
    return (dispatch) => {
        dispatch(createPlan());
        return fakeBackend.createPlan(plan).then(response => {
            dispatch(createPlanSuccess(response.plan));
        }).catch(response => {
            dispatch(createPlanFailure(response.errorMessage));
        })
    }
}

export function updatePlan() {
    return {
        type: UPDATE_PLAN
    };
}

export function updatePlanSuccess() {
    return {
        type: UPDATE_PLAN_SUCCESS
    };
}

export function updatePlanFailure(message) {
    return {
        type: UPDATE_PLAN_FAILURE,
        payload: message
    };
}

export function requestPlanUpdate(plan) {
    return (dispatch) => {
        dispatch(updatePlan());
        return fakeBackend.updatePlan(plan).then(response => {
            dispatch(updatePlanSuccess());
        }).catch(response => {
            dispatch(updatePlanFailure(response.errorMessage));
        })
    }
}

export function deletePlan() {
    return {
        type: DELETE_PLAN
    };
}

export function deletePlanSuccess() {
    return {
        type: DELETE_PLAN_SUCCESS
    };
}

export function deletePlanFailure(message) {
    return {
        type: DELETE_PLAN_FAILURE,
        payload: message
    };
}

export function requestPlanDeletion (id) {
    return (dispatch) => {
        dispatch(deletePlan());
        return fakeBackend.deletePlan(id).then(response => {
            dispatch(deletePlanSuccess());
        }).catch(response => {
            dispatch(deletePlanFailure(response.errorMessage));
        })
    }
}