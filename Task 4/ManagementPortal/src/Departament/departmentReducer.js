import {
    FETCH_DEPARTMENT,  FETCH_DEPARTMENT_FAILURE,  FETCH_DEPARTMENT_SUCCESS,  RESET_SELECTED_DEPARTMENT,
    FETCH_DEPARTMENTS, FETCH_DEPARTMENTS_FAILURE, FETCH_DEPARTMENTS_SUCCESS, RESET_DEPARTMENTS,
    CREATE_DEPARTMENT, CREATE_DEPARTMENT_FAILURE, CREATE_DEPARTMENT_SUCCESS, RESET_NEW_DEPARTMENT,
    UPDATE_DEPARTMENT, UPDATE_DEPARTMENT_FAILURE, UPDATE_DEPARTMENT_SUCCESS, RESET_UPDATED_DEPARTMENT,
    DELETE_DEPARTMENT, DELETE_DEPARTMENT_FAILURE, DELETE_DEPARTMENT_SUCCESS, RESET_DELETED_DEPARTMENT,
} from "./deprtmentActions";

export default function(state = {
                            departmentsList: {
                                departments: [],
                                errorMessage: null,
                                isFetching: false
                            },
                            selectedDepartment:{
                                department: null,
                                errorMessage: null,
                                isFetching: false
                            },
                            newDepartment:{
                                success: false,
                                errorMessage: null,
                                isFetching: false
                            },
                            updatedDepartment:{
                                success: false,
                                errorMessage: null,
                                isFetching: false
                            },
                            deletedDepartment:{
                                success: false,
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
        case RESET_DEPARTMENTS:
            return Object.assign({}, state, {
                departmentsList: {
                    isFetching: false,
                    departments: [],
                    errorMessage: ''
                }
            });
        case FETCH_DEPARTMENT:
            return Object.assign({}, state, {
                selectedDepartment: {
                    isFetching: true,
                    department: null
                }
            });
        case FETCH_DEPARTMENT_SUCCESS:
            return Object.assign({}, state, {
                selectedDepartment: {
                    isFetching: false,
                    department: action.payload,
                    errorMessage: null
                }
            });
        case FETCH_DEPARTMENT_FAILURE:
            return Object.assign({}, state, {
                selectedDepartment: {
                    isFetching: false,
                    department: null,
                    errorMessage: action.payload
                }
            });
        case RESET_SELECTED_DEPARTMENT:
            return Object.assign({}, state, {
                selectedDepartment: {
                    isFetching: false,
                    department: {},
                    errorMessage: null
                }
            });
        case CREATE_DEPARTMENT:
            return Object.assign({}, state, {
                newDepartment: {
                    success: false,
                    errorMessage: null,
                    isFetching: true
                }
            });
        case CREATE_DEPARTMENT_SUCCESS:
            return Object.assign({}, state, {
                newDepartment: {
                    success: true,
                    errorMessage: null,
                    isFetching: false
                }
            });
        case CREATE_DEPARTMENT_FAILURE:
            return Object.assign({}, state, {
                newDepartment: {
                    success: false,
                    errorMessage: action.payload,
                    isFetching: false
                }
            });
        case RESET_NEW_DEPARTMENT:
            return Object.assign({}, state, {
                newDepartment: {
                    success: false,
                    errorMessage: null,
                    isFetching: false
                }
            });
        case UPDATE_DEPARTMENT:
            return Object.assign({}, state, {
                updatedDepartment: {
                    success: false,
                    errorMessage: null,
                    isFetching: true
                }
            });
        case UPDATE_DEPARTMENT_SUCCESS:
            return Object.assign({}, state, {
                updatedDepartment: {
                    success: true,
                    errorMessage: null,
                    isFetching: false
                }
            });
        case UPDATE_DEPARTMENT_FAILURE:
            return Object.assign({}, state, {
                updatedDepartment: {
                    success: false,
                    errorMessage: action.payload,
                    isFetching: false
                }
            });
        case RESET_UPDATED_DEPARTMENT:
            return Object.assign({}, state, {
                updatedDepartment: {
                    success: false,
                    errorMessage: null,
                    isFetching: false
                }
            });
        case DELETE_DEPARTMENT:
            return Object.assign({}, state, {
                deletedDepartment: {
                    success: false,
                    errorMessage: null,
                    isFetching: true
                }
            });
        case DELETE_DEPARTMENT_SUCCESS:
            return Object.assign({}, state, {
                deletedDepartment: {
                    success: true,
                    errorMessage: null,
                    isFetching: false
                }
            });
        case DELETE_DEPARTMENT_FAILURE:
            return Object.assign({}, state, {
                deletedDepartment: {
                    success: false,
                    errorMessage: action.payload,
                    isFetching: false
                }
            });
        case RESET_DELETED_DEPARTMENT:
            return Object.assign({}, state, {
                deletedDepartment: {
                    success: false,
                    errorMessage: null,
                    isFetching: false
                }
            });
        default:
            return state
    }
}