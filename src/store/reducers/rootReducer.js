import { combineReducers } from "redux";
import authReducer from "./authReducer";
import companyReducer from "./companyReducer";
import leaderBoardReducer from "./leaderBoardReducer";
import superAdminReducer from "./superAdminReducer";

const rootReducers = combineReducers({
  auth: authReducer,
  leaderBoard: leaderBoardReducer,
  company: companyReducer,
  superAdmin: superAdminReducer
});

export default rootReducers;
