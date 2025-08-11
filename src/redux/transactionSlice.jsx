import { createSlice } from "@reduxjs/toolkit";
import transactionData from "../mockdata/transactions.json";

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: transactionData,
  reducers: {},
});

export const selectTransactions = (state) => state.transactions;

export default transactionsSlice.reducer;
