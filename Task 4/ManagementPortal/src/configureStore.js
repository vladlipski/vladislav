import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import authReducer from "./Auth/authReducer";
import userReducer from "./User/userReducer";


export default function (initialState = {}) {
    const rootReducer = combineReducers({
        auth: authReducer,
        usersManager: userReducer
    });

    return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
