import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import authReducer from "./Auth/authReducer";
import userReducer from "./User/userReducer";
import planReducer from "./Plan/planReducer";


export default function (initialState = {}) {
    const rootReducer = combineReducers({
        auth: authReducer,
        usersManager: userReducer,
        plansManager: planReducer
    });

    return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
