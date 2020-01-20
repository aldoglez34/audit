import { combineReducers } from "redux";
import user from "./userReducers";
import audit from "./auditReducers";

const rootReducer = combineReducers({
  user,
  audit
});

export default rootReducer;
