import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthUserRes, IUser, IUserState } from "./interface";

import * as userServices from "../../services/user";
import { handleLoading, handleRejected } from "../storeUtils";
import ShowSnackbar from "../../utils";

export const createUser = createAsyncThunk<AuthUserRes, IUser>(
  "user/create-user",
  async (params, thunkApi) => {
    try {
      const { data } = await userServices.createUserRequest(params);
      return Promise.resolve(data);
    } catch (err: any) {
      ShowSnackbar.error(err.response.data.error);
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const uploadFile = createAsyncThunk<AuthUserRes, FormData>(
  "user/upload-user-file",
  async (params, thunkApi) => {
    try {
      const data = await userServices.uploadUserFileRequest(params);
      ShowSnackbar.success("File uploaded successfully");
      return Promise.resolve(data.data);
    } catch (err: any) {
      const payload = err.response.data;
      console.log("err payload ===========>", payload);

      const inValidRows = payload.invalidRows.map((e: any) => e.rowNumber);
      ShowSnackbar.error(
        `${payload.error}, Invalid rows are ${String(inValidRows)}`
      );
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

const initialState: IUserState = {
  loading: false,
  user: {} as IUser,
  activeStep: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      const data = state.user;
      state.user = { ...data, ...payload };
    },
    resetUserData: (state) => {
      state.user = {} as IUser;
    },
    setActiveStep: (state, { payload }) => {
      state.activeStep = payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(createUser.rejected, handleRejected())
      .addCase(createUser.pending, handleLoading())
      .addCase(createUser.fulfilled, (state, { payload }) => {
        console.log("payload create User ===========>", payload);
        state.loading = false;
      })

      .addCase(uploadFile.rejected, handleRejected())
      .addCase(uploadFile.pending, handleLoading())
      .addCase(uploadFile.fulfilled, (state, { payload }) => {
        console.log("payload create User ===========>", payload);
        state.loading = false;
      });
  },
});

export const { setUserData, resetUserData, setActiveStep } = userSlice.actions;

export default userSlice.reducer;
