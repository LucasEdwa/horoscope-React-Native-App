import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { gql, request } from 'graphql-request';

interface SignupState {
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string;
}

const initialState: SignupState = {
  loading: false,
  error: null,
  success: false,
  message: '',
};

const SIGNUP_MUTATION = gql`
  mutation Signup(
    $name: String!
    $email: String!
    $password: String!
    $dateOfBirth: String!
    $timeOfBirth: String!
    $city: String!
    $country: String!
  ) {
    signup(
      name: $name
      email: $email
      password: $password
      dateOfBirth: $dateOfBirth
      timeOfBirth: $timeOfBirth
      city: $city
      country: $country
    ) {
      success
      message
    }
  }
`;

export const signupUser = createAsyncThunk(
  'signup/signupUser',
  async (
    variables: {
      name: string;
      email: string;
      password: string;
      dateOfBirth: string;
      timeOfBirth: string;
      city: string;
      country: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const endpoint = 'http://localhost:3001/signup'; // Change to your server address if needed
      const data = await request(endpoint, SIGNUP_MUTATION, variables) as {
        signup: { success: boolean; message: string }
      };
      return data.signup;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Signup failed');
    }
  }
);

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    resetSignup: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = '';
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetSignup } = signupSlice.actions;
export default signupSlice.reducer;
