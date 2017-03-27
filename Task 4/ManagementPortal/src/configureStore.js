import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import loginReducers from "./Login/loginReducers";

export default function (initialState = {}) {
    const rootReducer = combineReducers({
        loginReducers
    });

    return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
