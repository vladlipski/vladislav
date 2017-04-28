import {
    FETCH_DEPARTMENT,  FETCH_DEPARTMENT_FAILURE,  FETCH_DEPARTMENT_SUCCESS,  RESET_SELECTED_DEPARTMENT,
    FETCH_DEPARTMENTS, FETCH_DEPARTMENTS_FAILURE, FETCH_DEPARTMENTS_SUCCESS, RESET_DEPARTMENTS,
    CREATE_DEPARTMENT, CREATE_DEPARTMENT_FAILURE, CREATE_DEPARTMENT_SUCCESS, RESET_NEW_DEPARTMENT,
    UPDATE_DEPARTMENT, UPDATE_DEPARTMENT_FAILURE, UPDATE_DEPARTMENT_SUCCESS, RESET_UPDATED_DEPARTMENT,
    DELETE_DEPARTMENT, DELETE_DEPARTMENT_FAILURE, DELETE_DEPARTMENT_SUCCESS, RESET_DELETED_DEPARTMENT,
} from "./deprtmentActions";
import Immutable from 'immutable';


export default function(state = Immutable.fromJS({
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
                        }), action) {
    switch (action.type) {
        case FETCH_DEPARTMENTS:
            return  state.set('departmentsList', Immutable.fromJS({
                isFetching: true,
                departments: [],
                errorMessage: null
            }));
        case FETCH_DEPARTMENTS_SUCCESS:
            return state.set('departmentsList', Immutable.fromJS({
                isFetching: false,
                departments: action.payload,
                errorMessage: null
            }));
        case FETCH_DEPARTMENTS_FAILURE:
            return state.set('departmentsList', Immutable.fromJS({
                isFetching: false,
                departments: [],
                errorMessage: action.payload
            }));
        case FETCH_DEPARTMENT:
            return state.set('selectedDepartment', Immutable.fromJS({
                isFetching: true,
                department: null
            }));
        case FETCH_DEPARTMENT_SUCCESS:
            return  state.set('selectedDepartment', Immutable.fromJS({
                isFetching: false,
                department: action.payload,
                errorMessage: null
            }));
        case FETCH_DEPARTMENT_FAILURE:
            return state.set('selectedDepartment', Immutable.fromJS({
                isFetching: false,
                department: null,
                errorMessage: action.payload
            }));
        case RESET_SELECTED_DEPARTMENT:
            return  state.set('selectedDepartment', Immutable.fromJS({
                isFetching: false,
                department: {},
                errorMessage: null
            }));
        case CREATE_DEPARTMENT:
            return state.set('newDepartment', Immutable.fromJS({
                success: false,
                errorMessage: null,
                isFetching: true
            }));
        case CREATE_DEPARTMENT_SUCCESS:
            return state.set('newDepartment', Immutable.fromJS({
                success: true,
                errorMessage: null,
                isFetching: false
            }));
        case CREATE_DEPARTMENT_FAILURE:
            return state.set('newDepartment', Immutable.fromJS({
                success: false,
                errorMessage: action.payload,
                isFetching: false
            }));
        case RESET_NEW_DEPARTMENT:
            return state.set('newDepartment', Immutable.fromJS({
                success: false,
                errorMessage: null,
                isFetching: false
            }));
        case UPDATE_DEPARTMENT:
            return state.set('updatedDepartment', Immutable.fromJS({
                success: false,
                errorMessage: null,
                isFetching: true
            }));
        case UPDATE_DEPARTMENT_SUCCESS:
            return state.set('updatedDepartment', Immutable.fromJS({
                success: true,
                errorMessage: null,
                isFetching: false
            }));
        case UPDATE_DEPARTMENT_FAILURE:
            return state.set('updatedDepartment', Immutable.fromJS({
                success: false,
                errorMessage: action.payload,
                isFetching: false
            }));
        case RESET_UPDATED_DEPARTMENT:
            return state.set('updatedDepartment', Immutable.fromJS({
                success: false,
                errorMessage: null,
                isFetching: false
            }));
        case DELETE_DEPARTMENT:
            return state.set('deletedDepartment', Immutable.fromJS({
                success: false,
                errorMessage: null,
                isFetching: true
            }));
        case DELETE_DEPARTMENT_SUCCESS:
            return state.set('deletedDepartment', Immutable.fromJS({
                success: true,
                errorMessage: null,
                isFetching: false
            }));
        case DELETE_DEPARTMENT_FAILURE:
            return state.set('deletedDepartment', Immutable.fromJS({
                success: false,
                errorMessage: action.payload,
                isFetching: false
            }));
        case RESET_DELETED_DEPARTMENT:
            return state.set('deletedDepartment', Immutable.fromJS({
                success: false,
                errorMessage: null,
                isFetching: false
            }));
        default:
            return state
    }
}