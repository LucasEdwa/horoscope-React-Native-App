import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { gql, request } from 'graphql-request';

// --- Types ---
interface User {
  id: string;
  email: string;
  username: string;
  birthdate: string;
  birthtime: string;
  birth_city: string;
  birth_country: string;
  chartPoints: any[];
}

interface UserState {
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string;
  email: string | null;
  isAuthenticated: boolean;
  user: User | null; 
}

interface SignupVars {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  timeOfBirth: string;
  city: string;
  country: string;
}

interface SigninVars {
  email: string;
  password: string;
}

// --- Initial State ---
const initialState: UserState = {
  loading: false,
  error: null,
  success: false,
  message: '',
  email: null,
  isAuthenticated: false,
  user: null, // <-- Add this line
};

// --- GraphQL Mutations ---
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

const SIGNIN_MUTATION = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      success
      message
      email
    }
  }
`;

const USER_ENDPOINT = 'http://localhost:3001/user';

// --- Thunks ---
export const signupUser = createAsyncThunk(
  'user/signupUser',
  async (variables: SignupVars, { rejectWithValue }) => {
    try {
      const data = await request(USER_ENDPOINT, SIGNUP_MUTATION, variables) as {
        signup: { success: boolean; message: string }
      };
      return data.signup;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Signup failed');
    }
  }
);

export const signinUser = createAsyncThunk(
  'user/signinUser',
  async (variables: SigninVars, { rejectWithValue }) => {
    try {
      const data = await request(USER_ENDPOINT, SIGNIN_MUTATION, variables) as {
        signin: { success: boolean; message: string; email: string }
      };
      return data.signin;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Signin failed');
    }
  }
);

// --- Fetch user details by email using GraphQL ---
const fetchUserThunk = createAsyncThunk(
  'user/fetchUser',
  async (email: string, { rejectWithValue }) => {
    try {
      const USER_QUERY = gql`
        query User($email: String!) {
          user(email: $email) {
            id
            email
            username
            birthdate
            birthtime
            birth_city
            birth_country
            chartPoints {
              pointType
              sign
              description
              house
            }
          }
        }
      `;
      const endpoint = 'http://localhost:3001/user';
      const data = await request(endpoint, USER_QUERY, { email }) as { user: any };
      return data.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Fetch user failed');
    }
  }
);

// --- Slice ---
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = '';
      state.email = null;
      state.isAuthenticated = false;
      // Optionally clear user data
      (state as any).user = null;
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.email = null;
      (state as any).user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Signup
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
      })
      // Signin
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = '';
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.email = action.payload.email || null;
        state.isAuthenticated = !!action.payload.success;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
        state.isAuthenticated = false;
      })
      // Fetch User
      .addCase(fetchUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        (state as any).user = action.payload;
        state.email = action.payload?.email || null;
      })
      .addCase(fetchUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUser, signOut } = userSlice.actions;
export const fetchUser = fetchUserThunk;
export default userSlice.reducer;
