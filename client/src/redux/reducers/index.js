import { combineReducers } from "redux";
import user from "./userReducers";
import navbar from "./navbarReducers";
import audit from "./auditReducers";

const rootReducer = combineReducers({
  user,
  navbar,
  audit
});

export default rootReducer;
