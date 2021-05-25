import { createStore, combineReducers } from "redux";
import Reducer from './Reducer';

let reducers = combineReducers({
    koloda: Reducer
});

let store = createStore(reducers);

export default store;
