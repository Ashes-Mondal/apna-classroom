import { combineReducers } from "redux";
/************************ REDUCERS STARTS HERE************************/
//import all Reducer functions here
import userAuthentication from './userAuthentication'
import enrolledClassrooms from './enrolledClassrooms'
import theme from './theme'

/************************ REDUCERS ENDS HERE**************************/
const rootReducer = combineReducers({
    userAuthentication,
    enrolledClassrooms,
    theme
});

export default rootReducer;