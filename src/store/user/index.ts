import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthUserRes, IUser, IUserState } from "./interface";
// import { persistor } from "store";
// import { handleLoading, handleRejected } from "store/utils";
// import { processError } from "utilities";
// import SnackbarUtils, { SnackbarUtilsConfig } from "utilities/SnackbarUtils";

import * as userServices from "../../services/user";
import { handleLoading, handleRejected } from "../storeUtils";

export const createUser = createAsyncThunk<AuthUserRes, IUser>(
  "user/create-user",
  async (params) => {
    const { data } = await userServices.createUserRequest(params);
    return Promise.resolve(data);
  }
);

export const uploadFile = createAsyncThunk<AuthUserRes, FormData>(
  "user/upload-user-file",
  async (params, thunkApi) => {
    try {
      const data = await userServices.uploadUserFileRequest(params);
      console.log("data ===========>", data);
      return Promise.resolve(data.data);
    } catch (error: any) {
      console.log("catch ===========>", error.response.data);

      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const initialState: IUserState = {
  loading: false,
  user: {} as IUser,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      const data = state.user;
      state.user = { ...data, ...payload };
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

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
