import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import authReducer from "./Auth/authReducer";
import userReducer from "./User/userReducer";
import planReducer from "./Plan/planReducer";
import departmentReducer from "./Departament/departmentReducer";
import {combineReducers} from "redux-immutable";
import Immutable from 'immutable';

export default function (initialState = Immutable.fromJS()) {
    const rootReducer = combineReducers({
        auth: authReducer,
        usersManager: userReducer,
        plansManager: planReducer,
        departmentsManager: departmentReducer
    });

    return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
