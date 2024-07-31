import { CaseReducer } from "@reduxjs/toolkit";

export const handleLoading =
  (key = "loading"): CaseReducer<any> =>
  (state) => {
    state[key] = true;
  };

export const handleRejected =
  (key = "loading"): CaseReducer<any> =>
  (state) => {
    state[key] = false;
  };
