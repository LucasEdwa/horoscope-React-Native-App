import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { gql, request } from 'graphql-request';

interface SigninState {
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string;
  email: string | null; // <-- add this line
}

const initialState: SigninState = {
  loading: false,
  error: null,
  success: false,
  message: '',
  email: null, // <-- add this line
};

const SIGNIN_MUTATION = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      success
      message
    }
  }
`;

export const signinUser = createAsyncThunk(
  'signin/signinUser',
  async (
    variables: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const endpoint = 'http://localhost:3001/signin'; // Change to your server address if needed
      const data = await request(endpoint, SIGNIN_MUTATION, variables) as {
        signin: { success: boolean; message: string }
      };
      return data.signin;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Signin failed');
    }
  }
);

const signinSlice = createSlice({
  name: 'signin',
  initialState,
  reducers: {
    resetSignin: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = '';
      state.email = null; // <-- add this line
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = '';
        state.email = null; // <-- add this line
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.email = action.meta.arg.email; // <-- store email on success
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
        state.message = '';
        state.email = null; // <-- add this line
      });
  },
});

export const { resetSignin } = signinSlice.actions;
export default signinSlice.reducer;
