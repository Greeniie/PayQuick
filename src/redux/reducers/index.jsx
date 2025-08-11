import { combineReducers } from "@reduxjs/toolkit";
import auth from "../authSlice";
import transactions from '../transactionSlice'
import profile from "../profileSlice";



const rootReducer = combineReducers({
  auth,
  transactions,
  profile

});

export default rootReducer;