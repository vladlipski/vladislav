import {
    FETCH_DEPARTMENTS, FETCH_DEPARTMENTS_FAILURE, FETCH_DEPARTMENTS_SUCCESS
} from "./deprtmentActions";

export default function(state = {
                            departmentsList: {
                                departments: [],
                                errorMessage: null,
                                isFetching: false
                            }
                        }, action) {
    switch (action.type) {
        case FETCH_DEPARTMENTS:
            return Object.assign({}, state, {
                departmentsList: {
                    isFetching: true,
                    departments: []
                }
            });
        case FETCH_DEPARTMENTS_SUCCESS:
            return Object.assign({}, state, {
                departmentsList: {
                    isFetching: false,
                    departments: action.payload,
                    errorMessage: ''
                }
            });
        case FETCH_DEPARTMENTS_FAILURE:
            return Object.assign({}, state, {
                departmentsList: {
                    isFetching: false,
                    departments: [],
                    errorMessage: action.payload
                }
            });
        default:
            return state
    }
}