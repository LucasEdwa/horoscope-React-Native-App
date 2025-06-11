import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Define the user and chart point types
export interface ChartPoint {
  pointType: string;
  sign: string | null;
  description: string | null;
  house: number | null;
}

export interface UserState {
  loading: boolean;
  error: string | null;
  user: {
    id: string;
    email: string;
    username: string;
    birthdate: string;
    birthtime: string;
    birth_city: string;
    birth_country: string;
    chartPoints: ChartPoint[];
  } | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  user: null,
};

// Async thunk to fetch user data from your GraphQL endpoint
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query($email: String!) {
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
          `,
          variables: { email },
        }),
      });
      const data = await response.json();
      if (data.errors) {
        return rejectWithValue(data.errors[0].message);
      }
      return data.data.user;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch user');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
