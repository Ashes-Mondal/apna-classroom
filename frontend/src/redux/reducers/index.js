import { combineReducers } from "redux";
/************************ REDUCERS STARTS HERE************************/
//import all Reducer functions here
import userAuthentication from './userAuthentication'

/************************ REDUCERS ENDS HERE**************************/
const rootReducer = combineReducers({
    userAuthentication,
});

export default rootReducer;