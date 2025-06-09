import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { gql, request } from 'graphql-request';

interface ZodiacChartState {
  loading: boolean;
  error: string | null;
  chart: {
    sunSign?: string;
    dateOfBirth?: string;
    timeOfBirth?: string;
    city?: string;
    country?: string;
  } | null;
}

const initialState: ZodiacChartState = {
  loading: false,
  error: null,
  chart: null,
};

const ZODIAC_CHART_QUERY = gql`
  query ZodiacChart($email: String!) {
    zodiacChart(email: $email) {
      sunSign
      dateOfBirth
      timeOfBirth
      city
      country
    }
  }
`;

export const fetchZodiacChart = createAsyncThunk(
  'zodiacChart/fetchZodiacChart',
  async (email: string, { rejectWithValue }) => {
    try {
      const endpoint = 'http://localhost:3001/zodiac-chart'; // GraphQL endpoint
      const data = await request(endpoint, ZODIAC_CHART_QUERY, { email }) as {
        zodiacChart: {
          sunSign?: string;
          dateOfBirth?: string;
          timeOfBirth?: string;
          city?: string;
          country?: string;
        } | null;
      };
      if (!data.zodiacChart) throw new Error('No chart found');
      return data.zodiacChart;
    } catch (error: any) {
      return rejectWithValue(error.response?.errors?.[0]?.message || error.message || 'Failed to fetch chart');
    }
  }
);

const zodiacChartSlice = createSlice({
  name: 'zodiacChart',
  initialState,
  reducers: {
    resetZodiacChart: (state) => {
      state.loading = false;
      state.error = null;
      state.chart = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchZodiacChart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.chart = null;
      })
      .addCase(fetchZodiacChart.fulfilled, (state, action) => {
        state.loading = false;
        state.chart = action.payload;
      })
      .addCase(fetchZodiacChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.chart = null;
      });
  },
});

export const { resetZodiacChart } = zodiacChartSlice.actions;
export default zodiacChartSlice.reducer;
