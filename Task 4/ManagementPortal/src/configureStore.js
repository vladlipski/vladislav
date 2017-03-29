import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import authReducer from "./Auth/authReducer";


export default function (initialState = {}) {
    var rootReducer = combineReducers({
        auth: authReducer
    });

    return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
